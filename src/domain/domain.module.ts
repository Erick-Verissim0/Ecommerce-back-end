import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from './repository/users/users.interface';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },
  ],
  exports: [UsersRepository],
})
export class DomainModule {}
