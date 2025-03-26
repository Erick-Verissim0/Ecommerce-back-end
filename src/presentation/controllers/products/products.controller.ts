import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetAllProductsDto } from 'src/application/dto/products/get_all_products.dto';
import { PostProductDto } from 'src/application/dto/products/post_product.dto';
import { UpdateProductDto } from 'src/application/dto/products/update_product.dto';
import { DeleteProductUseCase } from 'src/application/usecases/products/delete_product.usecase';
import { GetAllProductUseCase } from 'src/application/usecases/products/get_all_product.usecase';
import { GetOneProductUseCase } from 'src/application/usecases/products/get_one_product.usecase';
import { PostProductsUseCase } from 'src/application/usecases/products/post_product.usecase';
import { UpdateProductUseCase } from 'src/application/usecases/products/update_product.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly postProductsUseCase: PostProductsUseCase,
    private readonly getOneProductUseCase: GetOneProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async postProducts(@Body() data: PostProductDto): Promise<ProductInterface> {
    return this.postProductsUseCase.execute(data);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface> {
    return this.updateProductUseCase.execute(id, updateProductDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<ProductInterface | null> {
    return this.deleteProductUseCase.execute(id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductInterface> {
    return this.getOneProductUseCase.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiQuery({ name: 'minPrice', type: Number, required: false })
  @ApiQuery({ name: 'maxPrice', type: Number, required: false })
  @ApiQuery({ name: 'minStock', type: Number, required: false })
  @ApiQuery({ name: 'maxStock', type: Number, required: false })
  async getAllProducts(
    @Query() filters: GetAllProductsDto,
  ): Promise<ProductInterface[]> {
    return this.getAllProductUseCase.execute(filters);
  }
}
