import { GetAllProductsDto } from 'src/application/dto/products/get_all_products.dto';
import { PostProductDto } from 'src/application/dto/products/post_product.dto';
import { UpdateProductDto } from 'src/application/dto/products/update_product.dto';
import { ProductInterface } from 'src/presentation/interface/products/product.interface';

export interface ProductsRepository {
  postProduct(data: PostProductDto): Promise<ProductInterface | null>;
  getOneProduct(id: number): Promise<ProductInterface | null>;
  getAllProducts(filters: GetAllProductsDto): Promise<ProductInterface[]>;
  updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface | null>;
  deleteProduct(id: number): Promise<ProductInterface | null>;
}

export const ProductsRepository = Symbol('ProductsRepository');
