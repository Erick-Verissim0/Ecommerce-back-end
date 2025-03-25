import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class GetOneProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(id: number): Promise<ProductInterface> {
    const product = await this.productsRepository.getOneProduct(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  }
}
