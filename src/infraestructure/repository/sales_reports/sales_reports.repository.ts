import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'json2csv';
import { SalesReport } from 'src/domain/entities/sales_reports';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/domain/entities/orders_items';
import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { config } from 'src/domain/config/environment/enviroment.confg';

export class PgSalesReportsRepository implements SalesReportsRepository {
  constructor(
    @InjectRepository(SalesReport)
    private salesReportRepository: Repository<SalesReport>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async postSaleReport(
    periodStart: Date,
    periodEnd: Date,
  ): Promise<SalesReport> {
    const getConfig = await config();

    try {
      const salesData = await this.orderItemRepository
        .createQueryBuilder('orderItem')
        .innerJoinAndSelect('orderItem.product', 'product')
        .innerJoinAndSelect('orderItem.order', 'order')
        .where('order.created_at BETWEEN :start AND :end', {
          start: periodStart,
          end: periodEnd,
        })
        .andWhere('order.status IN (:...statuses)', {
          statuses: ['In preparation', 'Dispatched', 'Delivered'],
        })
        .select([
          'product.name AS product',
          'SUM(orderItem.quantity) AS quantity',
          'SUM(orderItem.total_price) AS total',
        ])
        .groupBy('product.name')
        .getRawMany();

      const totalSales = salesData.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0,
      );
      const productsSold = salesData.reduce(
        (acc, item) => acc + parseInt(item.quantity),
        0,
      );

      const outputDir = getConfig.getFilePath;

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const reportId = Date.now();
      const filePath = path.join(outputDir, `sales_report_${reportId}.csv`);

      const report = this.salesReportRepository.create({
        periodStart,
        periodEnd,
        totalSales,
        productsSold,
        filePath,
      });

      const savedReport = await this.salesReportRepository.save(report);

      const csvData = parse(salesData);
      fs.writeFileSync(filePath, csvData);

      return savedReport;
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async updateSaleReport(
    id: number,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<SalesReport | null> {
    try {
      const salesReport = await this.salesReportRepository.findOne({
        where: { id, deletedAt: null },
      });

      if (!salesReport) {
        throw new Error('Sale report not found');
      }

      const salesData = await this.orderItemRepository
        .createQueryBuilder('orderItem')
        .innerJoinAndSelect('orderItem.product', 'product')
        .innerJoinAndSelect('orderItem.order', 'order')
        .where('order.created_at BETWEEN :start AND :end', {
          start: periodStart,
          end: periodEnd,
        })
        .andWhere('order.status IN (:...statuses)', {
          statuses: ['In preparation', 'Dispatched', 'Delivered'],
        })
        .select([
          'product.name AS product',
          'SUM(orderItem.quantity) AS quantity',
          'SUM(orderItem.total_price) AS total',
        ])
        .groupBy('product.name')
        .getRawMany();

      const totalSales = salesData.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0,
      );
      const productsSold = salesData.reduce(
        (acc, item) => acc + parseInt(item.quantity),
        0,
      );

      salesReport.periodStart = periodStart;
      salesReport.periodEnd = periodEnd;
      salesReport.totalSales = totalSales;
      salesReport.productsSold = productsSold;

      const csvData = parse(salesData);

      const outputDir = path.join(__dirname, 'reports');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      const filePath = path.join(
        outputDir,
        `sales_report_${salesReport.id}.csv`,
      );

      fs.writeFileSync(filePath, csvData);

      salesReport.filePath = filePath;

      await this.salesReportRepository.save(salesReport);

      return salesReport;
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getAllSalesReports(): Promise<SalesReport[]> {
    try {
      return await this.salesReportRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getOneSalesReport(id: number): Promise<SalesReport | null> {
    try {
      return await this.salesReportRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async deleteSaleReport(id: number): Promise<void> {
    try {
      const salesReport = await this.salesReportRepository.findOne({
        where: { id },
      });

      if (!salesReport) {
      }

      salesReport.deletedAt = new Date();
      await this.salesReportRepository.save(salesReport);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
