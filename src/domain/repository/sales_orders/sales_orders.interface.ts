import { SalesReport } from 'src/domain/entities/sales_reports';

export interface SalesReportsRepository {
  postSaleReport(
    periodStart: Date,
    periodEnd: Date,
    filePath: string,
  ): Promise<SalesReport>;
  getAllSalesReports(): Promise<SalesReport[]>;
  getOneSalesReport(id: number): Promise<SalesReport | null>;
  deleteSaleReport(id: number): Promise<void>;
  updateSaleReport(
    id: number,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<SalesReport>;
}

export const SalesReportsRepository = Symbol('SalesReportsRepository');
