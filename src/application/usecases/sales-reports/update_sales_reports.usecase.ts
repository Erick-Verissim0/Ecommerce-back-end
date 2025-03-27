import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';
import { SalesReport } from 'src/domain/entities/sales_reports';
import { Inject, InternalServerErrorException } from '@nestjs/common';

export class UpdateSaleReportUseCase {
  constructor(
    @Inject(SalesReportsRepository)
    private salesReportsRepository: SalesReportsRepository,
  ) {}

  async execute(
    id: number,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<SalesReport> {
    try {
      const updatedReport = await this.salesReportsRepository.updateSaleReport(
        id,
        periodStart,
        periodEnd,
      );

      if (!updatedReport) {
        throw new Error('Sale report update failed');
      }

      return updatedReport;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update sale report: ${error.message}`,
      );
    }
  }
}
