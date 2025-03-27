import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SalesReportsRepository } from 'src/domain/repository/sales_orders/sales_orders.interface';
import { SalesReport } from 'src/domain/entities/sales_reports';

@Injectable()
export class GetAllSalesReportsUseCase {
  constructor(
    @Inject(SalesReportsRepository)
    private salesReportsRepository: SalesReportsRepository,
  ) {}

  async execute(): Promise<SalesReport[]> {
    try {
      return await this.salesReportsRepository.getAllSalesReports();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to load all sales reports: ${error.message}`,
      );
    }
  }
}
