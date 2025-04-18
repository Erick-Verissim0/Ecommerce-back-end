import { Module } from '@nestjs/common';
import { AuthModule } from '../infraestructure/auth/auth.module';
import { PaymentModule } from '../infraestructure/payment/payment.module';
import { PostUsersUseCase } from 'src/application/usecases/users/post_users.usecase';
import { ValidateAuthUseCase } from 'src/application/usecases/auth/validate_auth.usecase';
import { LoginUserUseCase } from 'src/application/usecases/users/login.usecase';
import { GetAllUsersUseCase } from 'src/application/usecases/users/get_all_users.usecase';
import { UpdateUsersUseCase } from 'src/application/usecases/users/update_users.usecase';
import { GetOneUsesUseCase } from 'src/application/usecases/users/get_one_user.usecase';
import { DeleteUserUseCase } from 'src/application/usecases/users/delete_user.usecase';
import { PostClientsUseCase } from 'src/application/usecases/clients/post_client.usecase';
import { GetAllClientsUseCase } from 'src/application/usecases/clients/get_all_clients.usecase';
import { GetOneClientUseCase } from 'src/application/usecases/clients/get_one_client.usecase';
import { UpdateClientUseCase } from 'src/application/usecases/clients/update_client.usecase';
import { DeleteClientsUseCase } from 'src/application/usecases/clients/delete_client.usecase';
import { PostProductsUseCase } from 'src/application/usecases/products/post_product.usecase';
import { GetOneProductUseCase } from 'src/application/usecases/products/get_one_product.usecase';
import { GetAllProductUseCase } from 'src/application/usecases/products/get_all_product.usecase';
import { UpdateProductUseCase } from 'src/application/usecases/products/update_product.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/products/delete_product.usecase';
import { PostOrdersUseCase } from 'src/application/usecases/orders/post_orders.usecase';
import { GetAllOrdersUseCase } from 'src/application/usecases/orders/get_all_orders.usecase';
import { GetOneOrderUseCase } from 'src/application/usecases/orders/get_one_order.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/orders/update_orders.usecase';
import { DeleteOrderUseCase } from 'src/application/usecases/orders/delete_orders.usecase';
import { GetByIdOrderItem } from 'src/application/usecases/orders_items/get_one_order_item.usecase';
import { GetAllOrderItemsUseCase } from 'src/application/usecases/orders_items/get_all_orders.usecase';
import { UpdateOrderItemUseCase } from 'src/application/usecases/orders_items/update_order_item.usecase';
import { DeleteOrderItemUseCase } from 'src/application/usecases/orders_items/delete_order_item.usecase';
import { PostOrderItemUseCase } from 'src/application/usecases/orders_items/post_order_item.usecase';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule, AuthModule, PaymentModule],
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
    PostOrdersUseCase,
    GetAllOrdersUseCase,
    GetOneOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    GetByIdOrderItem,
    GetAllOrderItemsUseCase,
    UpdateOrderItemUseCase,
    DeleteOrderItemUseCase,
    PostOrderItemUseCase,
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
    PostOrdersUseCase,
    GetAllOrdersUseCase,
    GetOneOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    GetByIdOrderItem,
    GetAllOrderItemsUseCase,
    UpdateOrderItemUseCase,
    DeleteOrderItemUseCase,
    PostOrderItemUseCase,
  ],
})
export class ApplicationModule {}
