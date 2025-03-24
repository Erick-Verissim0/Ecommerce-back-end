import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { User } from 'src/domain/entities/users';
import { PgUsersRepository } from './repository/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },
  ],
  exports: [UsersRepository],
})
export class InfrastructureModule {}
