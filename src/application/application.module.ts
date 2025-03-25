import { Module } from '@nestjs/common';
import { PostUsersUseCase } from './usecases/users/post_users.usecase';
import { AuthModule } from 'src/infraestructure/services/auth.module';
import { ValidateAuthUseCase } from './usecases/auth/validate_auth.usecase';
import { DomainModule } from 'src/domain/domain.module';
import { LoginUserUseCase } from './usecases/users/login.usecase';
import { GetAllUsersUseCase } from './usecases/users/get_all_users.usecase';
import { UpdateUsersUseCase } from './usecases/users/update_users.usecase';
import { GetOneUsesUseCase } from './usecases/users/get_one_user.usecase';
import { DeleteUserUseCase } from './usecases/users/delete_user.usecase';
import { PostClientsUseCase } from './usecases/clients/post_client.usecase';
import { GetAllClientsUseCase } from './usecases/clients/get_all_clients.usecase';
import { GetOneClientUseCase } from './usecases/clients/get_one_client.usecase';
import { UpdateClientUseCase } from './usecases/clients/update_client.usecase';
import { DeleteClientsUseCase } from './usecases/clients/delete_client.usecase';
import { PostProductsUseCase } from './usecases/products/post_product.usecase';
import { GetOneProductUseCase } from './usecases/products/get_one.usecase';
import { GetAllProductUseCase } from './usecases/products/get_all_product.usecase';
import { UpdateProductUseCase } from './usecases/products/update_product.usecase';
import { DeleteProductUseCase } from './usecases/products/delete_product.usecase';

@Module({
  imports: [DomainModule, AuthModule],
  providers: [
    PostUsersUseCase,
    ValidateAuthUseCase,
    LoginUserUseCase,
    GetAllUsersUseCase,
    UpdateUsersUseCase,
    GetOneUsesUseCase,
    DeleteUserUseCase,
    PostClientsUseCase,
    GetAllClientsUseCase,
    GetOneClientUseCase,
    UpdateClientUseCase,
    DeleteClientsUseCase,
    PostProductsUseCase,
    GetOneProductUseCase,
    GetAllProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [
    PostUsersUseCase,
    ValidateAuthUseCase,
    LoginUserUseCase,
    GetAllUsersUseCase,
    UpdateUsersUseCase,
    GetOneUsesUseCase,
    DeleteUserUseCase,
    PostClientsUseCase,
    GetAllClientsUseCase,
    GetOneClientUseCase,
    UpdateClientUseCase,
    DeleteClientsUseCase,
    PostProductsUseCase,
    GetOneProductUseCase,
    GetAllProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ApplicationModule {}
