import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';
import { PostUsersUseCase } from '../../../usecases/users/post_users.usecase';
import { GetAllUsersUseCase } from '../../../usecases/users/get_all_users.usecase';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { UsersController } from 'src/presentation/controllers/users/users.controller';
import { UpdateUsersUseCase } from '../../../usecases/users/update_users.usecase';
import { DeleteUserUseCase } from '../../../usecases/users/delete_user.usecase';
import { GetOneUsesUseCase } from '../../../usecases/users/get_one_user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [
    PostUsersUseCase,
    UpdateUsersUseCase,
    DeleteUserUseCase,
    GetAllUsersUseCase,
    GetOneUsesUseCase,
    {
      provide: UsersRepository,
      useClass: PgUsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UserModule {}
