import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { User } from 'src/domain/entities/users';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'client';
}

describe('PgUsersRepository', () => {
  let pgUsersRepository: PgUsersRepository;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PgUsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    pgUsersRepository = module.get<PgUsersRepository>(PgUsersRepository);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(pgUsersRepository).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const userData: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      type: 'client',
    };
    const mockUser = { id: 1, ...userData };

    mockUserRepository.create.mockReturnValue(mockUser);
    mockUserRepository.save.mockResolvedValue(mockUser);

    const result = await pgUsersRepository.createUser(userData);

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
  });

  it('should throw InternalServerErrorException if user creation fails', async () => {
    const userData: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      type: 'admin',
    };

    mockUserRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(pgUsersRepository.createUser(userData)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
