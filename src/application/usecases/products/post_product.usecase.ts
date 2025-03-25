import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostProductDto } from 'src/application/dto/products/post_product.dto';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class PostProductsUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(data: PostProductDto): Promise<ProductInterface> {
    try {
      return await this.productsRepository.postProduct(data);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create product: ${error.message}`,
      );
    }
  }
}
