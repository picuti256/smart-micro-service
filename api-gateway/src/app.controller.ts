import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-cateogoria.dto';

@Controller('api/v1')
export class AppController {
  private clientAdminBackend: ClientProxy;

  constructor() {
    const password = 'Giovanne4?'; // Replace this with your actual password
    const encodedPassword = encodeURIComponent(password);
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://admin:${encodedPassword}@localhost:5672/smartranking`],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit(
      'criar-categoria',
      criarCategoriaDto,
    );
  }
}
