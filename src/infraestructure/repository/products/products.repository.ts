import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostProductDto } from 'src/application/dto/products/post_product.dto';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { GetAllProductsDto } from 'src/application/dto/products/get_all_products.dto';
import { UpdateProductDto } from 'src/application/dto/products/update_product.dto';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';
import { ProductModel } from 'src/infraestructure/config/typeorm/models/products.typeorm';

@Injectable()
export class PgProductsRepository implements ProductsRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async postProduct(data: PostProductDto): Promise<ProductInterface> {
    try {
      const newProduct = this.productRepository.create(data);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to save product: ${error.message}`,
      );
    }
  }

  async getOneProduct(id: number): Promise<ProductInterface | null> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view product: ${error.message}`,
      );
    }
  }

  async getAllProducts(
    filters: GetAllProductsDto,
  ): Promise<ProductInterface[]> {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product');

      if (filters.minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', {
          minPrice: filters.minPrice,
        });
      }

      if (filters.maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: filters.maxPrice,
        });
      }

      if (filters.minStock !== undefined) {
        queryBuilder.andWhere('product.stock >= :minStock', {
          minStock: filters.minStock,
        });
      }

      if (filters.maxStock !== undefined) {
        queryBuilder.andWhere('product.stock <= :maxStock', {
          maxStock: filters.maxStock,
        });
      }

      return await queryBuilder.getMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view products: ${error.message}`,
      );
    }
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface | null> {
    try {
      const product = await this.getOneProduct(id);
      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      Object.assign(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update product: ${error.message}`,
      );
    }
  }

  async deleteProduct(id: number): Promise<ProductInterface | null> {
    try {
      const product = await this.getOneProduct(id);
      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      product.deleted_at = new Date();
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete product: ${error.message}`,
      );
    }
  }
}
