import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productRepository: ProductsRepository,
  ) {}

  async execute(id: number): Promise<ProductInterface | null> {
    try {
      const product = await this.productRepository.getOneProduct(id);

      if (!product) {
        return null;
      }

      return this.productRepository.deleteProduct(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete product: ${error.message}`,
      );
    }
  }
}
