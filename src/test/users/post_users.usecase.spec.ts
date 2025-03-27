import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PostUsersUseCase } from 'src/application/usecases/users/post_users.usecase';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'client';
}

const mockUsersRepository = {
  createUser: jest.fn(),
};

const mockAuthService = {
  generateToken: jest.fn(),
};

describe('PostUsersUseCase', () => {
  let useCase: PostUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostUsersUseCase,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    useCase = module.get<PostUsersUseCase>(PostUsersUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('create a user and return token', async () => {
    const userData: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      type: 'admin',
    };

    const user = { ...userData, id: 1 };
    mockUsersRepository.createUser.mockResolvedValue(user);
    mockAuthService.generateToken.mockReturnValue('mockToken');

    const result = await useCase.execute(userData);

    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(user);
    expect(result).toHaveProperty('token', 'mockToken');
  });

  it('error when user creation fails', async () => {
    const userData: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      type: 'admin',
    };

    mockUsersRepository.createUser.mockResolvedValue(null);

    await expect(useCase.execute(userData)).rejects.toThrowError(
      InternalServerErrorException,
    );
  });
});
