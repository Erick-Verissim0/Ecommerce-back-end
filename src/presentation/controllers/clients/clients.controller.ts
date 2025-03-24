import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostClientsUseCase } from 'src/application/usecases/clients/post_client.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { PostClientDto } from 'src/application/dto/clients/post_client.dto';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';
import { GetAllClientsUseCase } from 'src/application/usecases/clients/get_all_clients.usecase';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { GetOneClientUseCase } from 'src/application/usecases/clients/get_one_client.usecase';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly postClientsUseCase: PostClientsUseCase,
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly getOneClientUseCase: GetOneClientUseCase,
  ) {}

  @Post()
  async postClient(
    @Body() data: PostClientDto,
  ): Promise<PostClientsInterface | null> {
    return this.postClientsUseCase.execute(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllClients(): Promise<GetClientsInterface[] | []> {
    return this.getAllClientsUseCase.execute();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneClient(
    @Param('id') id: number,
  ): Promise<GetClientsInterface | null> {
    const idClient = Number(id);

    return this.getOneClientUseCase.execute(idClient);
  }
}
