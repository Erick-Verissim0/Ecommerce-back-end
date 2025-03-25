import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostClientsUseCase } from 'src/application/usecases/clients/post_client.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { PostClientDto } from 'src/application/dto/clients/post_client.dto';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';
import { GetAllClientsUseCase } from 'src/application/usecases/clients/get_all_clients.usecase';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { GetOneClientUseCase } from 'src/application/usecases/clients/get_one_client.usecase';
import { UpdateClientsInterface } from 'src/presentation/interface/clients/update_client.interface';
import { UpdateClientUseCase } from 'src/application/usecases/clients/update_client.usecase';
import { DeleteClientsInterface } from 'src/presentation/interface/clients/delete_client.interface';
import { DeleteClientsUseCase } from 'src/application/usecases/clients/delete_client.usecase';
import { UpdateClientDto } from 'src/application/dto/clients/update_client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly postClientsUseCase: PostClientsUseCase,
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly getOneClientUseCase: GetOneClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientsUseCase: DeleteClientsUseCase,
  ) {}

  @Post()
  async postClient(
    @Body() data: PostClientDto,
  ): Promise<PostClientsInterface | null> {
    return this.postClientsUseCase.execute(data);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<UpdateClientsInterface | null> {
    return this.updateClientUseCase.execute(id, updateClientDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteClient(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteClientsInterface | null> {
    return this.deleteClientsUseCase.execute(id);
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
