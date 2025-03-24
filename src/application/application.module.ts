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
  ],
})
export class ApplicationModule {}
