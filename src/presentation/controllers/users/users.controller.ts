import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dto/users/create_users.dto';
import { LoginUserUseCase } from 'src/application/usecases/users/login.usecase';
import { PostUsersUseCase } from 'src/application/usecases/users/post_users.usecase';
import { LoginInterface } from 'src/presentation/interface/users/login.interface';
import { GetUsersInterface } from 'src/presentation/interface/users/get_users.interface';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { GetAllUsersUseCase } from 'src/application/usecases/users/get_all_users.usecase';
import { AuthenticatedRequestInterface } from 'src/presentation/interface/auth/authenticated_request.interface';
import { UpdateUserInterface } from 'src/presentation/interface/users/update_user.interface';
import { UpdateUsersUseCase } from 'src/application/usecases/users/update_users.usecase';
import { GetOneUserInterface } from 'src/presentation/interface/users/get_one_user.interface';
import { GetOneUsesUseCase } from 'src/application/usecases/users/get_one_user.usecase';
import { DeleteUserInterface } from 'src/presentation/interface/users/delete_user.interface';
import { DeleteUserUseCase } from 'src/application/usecases/users/delete_user.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly postUsersUseCase: PostUsersUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getOneUserUseCase: GetOneUsesUseCase,
    private readonly updateUsersUseCase: UpdateUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async postUsers(@Body() data: CreateUserDto) {
    return this.postUsersUseCase.execute(data);
  }

  // Endpoint responsável por enviar o e-mail e senha, e receber o token
  @Post('/login')
  async login(@Body() { email, password }): Promise<LoginInterface> {
    return this.loginUserUseCase.execute(email, password);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUsers(
    @Req() req: AuthenticatedRequestInterface,
    @Param('id') id: number,
    @Body() updateData: Partial<UpdateUserInterface>,
  ): Promise<UpdateUserInterface> {
    const user = req.user;
    const idParam = Number(id);

    if (user.type === 'client' && user.id !== idParam) {
      throw new UnauthorizedException(
        'Clients can only update their own information',
      );
    }

    return this.updateUsersUseCase.execute(id, updateData);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async DeleteUser(
    @Req() req: AuthenticatedRequestInterface,
    @Param('id') id: number,
  ): Promise<DeleteUserInterface> {
    const user = req.user;
    const idParam = Number(id);

    if (user.type === 'client' && user.id !== idParam) {
      throw new UnauthorizedException(
        'Clients can only delete their own information',
      );
    }

    return this.deleteUserUseCase.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() req: AuthenticatedRequestInterface,
  ): Promise<GetUsersInterface[]> {
    const { type } = req.user;
    if (type !== 'admin') throw new Error('User does not have permission');

    return this.getAllUsersUseCase.execute();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneUser(
    @Req() req: AuthenticatedRequestInterface,
    @Param('id') id: number,
  ): Promise<GetOneUserInterface> {
    const user = req.user;
    const idParam = Number(id);

    if (user.type === 'client' && user.id !== idParam) {
      throw new UnauthorizedException(
        'Clients can only view their own information',
      );
    }

    return this.getOneUserUseCase.execute(id);
  }
}
