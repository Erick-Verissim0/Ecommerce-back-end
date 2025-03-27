import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';

@Injectable()
export class DeleteSaleReportUseCase {
  constructor(
    @Inject(SalesReportsRepository)
    private salesReportsRepository: SalesReportsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    try {
      const salesReport = await this.salesReportsRepository.getOneSalesReport(
        id,
      );
      if (!salesReport) {
        throw new NotFoundException(`Sales report with ID ${id} not found`);
      }
      await this.salesReportsRepository.deleteSaleReport(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete sale report: ${error.message}`,
      );
    }
  }
}
