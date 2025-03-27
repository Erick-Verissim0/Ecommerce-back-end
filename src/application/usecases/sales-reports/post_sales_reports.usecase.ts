import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';
import { SalesReport } from 'src/domain/entities/sales_reports';
import { Inject } from '@nestjs/common';

export class PostSalesReportUseCase {
  constructor(
    @Inject(SalesReportsRepository)
    private salesReportsRepository: SalesReportsRepository,
  ) {}

  async execute(
    periodStart: Date,
    periodEnd: Date,
    filePath: string,
  ): Promise<SalesReport> {
    try {
      const report = await this.salesReportsRepository.postSaleReport(
        periodStart,
        periodEnd,
        filePath,
      );

      return report;
    } catch (error) {
      throw new Error('Failed to create sale report: ' + error.message);
    }
  }
}
