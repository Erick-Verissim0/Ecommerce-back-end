import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetAllProductsDto } from 'src/application/dto/products/get_all_products.dto';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class GetAllProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productRepository: ProductsRepository,
  ) {}

  async execute(filters: GetAllProductsDto): Promise<ProductInterface[]> {
   try {
     return this.productRepository.getAllProducts(filters);
   } catch (error) {
     throw new InternalServerErrorException(
       `Failed to load products: ${error.message}`,
     );
   }
  }
}
