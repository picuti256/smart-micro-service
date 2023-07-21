import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './jogadores/jogador.schema';
import { CategoriaSchema } from './categorias/categoria.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URL,
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Jogador', schema: JogadorSchema },
      { name: 'Categoria', schema: CategoriaSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
