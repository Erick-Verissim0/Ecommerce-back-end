import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';
import { SalesReport } from 'src/domain/entities/sales_reports';

@Injectable()
export class GetOneSalesReportUseCase {
  constructor(
    @Inject(SalesReportsRepository)
    private salesReportsRepository: SalesReportsRepository,
  ) {}

  async execute(id: number): Promise<SalesReport> {
    try {
      const salesReport = await this.salesReportsRepository.getOneSalesReport(
        id,
      );
      if (!salesReport) {
        throw new NotFoundException(`Sales report with ID ${id} not found`);
      }
      return salesReport;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view sale report: ${error.message}`,
      );
    }
  }
}
