import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostProductDto } from 'src/application/dto/products/post_product.dto';
import { Product } from 'src/domain/entities/products';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { GetAllProductsDto } from 'src/application/dto/products/get_all_products.dto';
import { UpdateProductDto } from 'src/application/dto/products/update_product.dto';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

@Injectable()
export class PgProductsRepository implements ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async postProduct(data: PostProductDto): Promise<ProductInterface> {
    try {
      const newProduct = this.productRepository.create(data);
      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error saving product: ${error.message}`,
      );
    }
  }

  async getOneProduct(id: number): Promise<ProductInterface | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async getAllProducts(filters: GetAllProductsDto): Promise<ProductInterface[]> {
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

    return queryBuilder.getMany();
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface | null> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      return null;
    }

    this.productRepository.merge(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<ProductInterface | null> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    product.deleted_at = new Date();

    return this.productRepository.save(product);
  }
}
