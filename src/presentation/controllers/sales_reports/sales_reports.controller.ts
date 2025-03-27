import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteSaleReportUseCase } from 'src/application/usecases/sales-reports/delete_sales_reports.usecase';
import { GetAllSalesReportsUseCase } from 'src/application/usecases/sales-reports/get_all_sales_reports.usecase';
import { GetOneSalesReportUseCase } from 'src/application/usecases/sales-reports/get_one_sales_reports.usecase';
import { PostSalesReportUseCase } from 'src/application/usecases/sales-reports/post_sales_reports.usecase';
import { UpdateSaleReportUseCase } from 'src/application/usecases/sales-reports/update_sales_reports.usecase';
import { SalesReport } from 'src/domain/entities/sales_reports';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';

@ApiTags('Sales Reports')
@Controller('sales_reports')
export class SalesReportsController {
  constructor(
    private readonly postSalesReportUseCase: PostSalesReportUseCase,
    private getAllSalesReportsUseCase: GetAllSalesReportsUseCase,
    private getOneSalesReportUseCase: GetOneSalesReportUseCase,
    private deleteSaleReportUseCase: DeleteSaleReportUseCase,
    private readonly updateSaleReportUseCase: UpdateSaleReportUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async postSalesReports(
    @Body() body: { periodStart: string; periodEnd: string; filePath: string },
  ): Promise<SalesReport> {
    const { periodStart, periodEnd, filePath } = body;

    return await this.postSalesReportUseCase.execute(
      new Date(periodStart),
      new Date(periodEnd),
      filePath,
    );
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateSalesReport(
    @Param('id') id: number,
    @Body() body: { periodStart: Date; periodEnd: Date },
  ): Promise<SalesReport> {
    return this.updateSaleReportUseCase.execute(
      id,
      body.periodStart,
      body.periodEnd,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSalesReport(@Param('id') id: number): Promise<void> {
    await this.deleteSaleReportUseCase.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllSalesReports(): Promise<SalesReport[]> {
    return await this.getAllSalesReportsUseCase.execute();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneSalesReport(@Param('id') id: number): Promise<SalesReport> {
    return await this.getOneSalesReportUseCase.execute(id);
  }
}
