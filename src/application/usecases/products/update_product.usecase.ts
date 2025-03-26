import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateProductDto } from 'src/application/dto/products/update_product.dto';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productRepository: ProductsRepository,
  ) {}

  async execute(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface | null> {
    try {
      const product = await this.productRepository.getOneProduct(id);
      if (!product) {
        throw new Error('Product not found');
      }

      return this.productRepository.updateProduct(id, updateProductDto);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update product: ${error.message}`,
      );
    }
  }
}
