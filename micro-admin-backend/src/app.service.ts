import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Categoria } from './categorias/categoria.interface';
import { Model } from 'mongoose';
import { Jogador } from './jogadores/jogador.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
}
