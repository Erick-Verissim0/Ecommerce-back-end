import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostClientsUseCase } from 'src/application/usecases/clients/post_client.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { PostClientDto } from 'src/presentation/interface/clients/post_client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly PostClientsUseCase: PostClientsUseCase) {}

  @Post()
  async postClient(@Body() data: PostClientDto) {
    return this.PostClientsUseCase.execute(data);
  }

  /* @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() req: AuthenticatedRequestInterface,
  ): Promise<GetUsersInterface[]> {
    const { type } = req.user;
    if (type !== 'admin') throw new Error('User does not have permission');

    return this.getAllUsersUseCase.execute();
  } */
}
