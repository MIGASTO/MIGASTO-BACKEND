import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolModule } from './user/rol/rol.module';
import { UsuarioModule } from './user/usuario/usuario.module';
import { PerfilUsuarioModule } from './user/perfil/perfil.module';
import { CategoriaModule } from './finance/categoria/categoria.module';
import { MovimientoModule } from './finance/movimiento/movimiento.module';
import { MonedaModule } from './finance/moneda/moneda.module';
import { PresupuestoModule } from './finance/presupuesto/presupuesto.module';
import { TagModule } from './finance/tag/tag.module';
import { MovimientoTagModule } from './finance/movimiento-tag/movimiento-tag.module';
import { NotificacionModule } from './notification/notificacion/notificacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsuarioModule,
    PerfilUsuarioModule,
    CategoriaModule,
    MovimientoModule,
    MonedaModule,
    PresupuestoModule,
    TagModule,
    MovimientoTagModule,
    NotificacionModule,
    /* */
    TypeOrmModule.forRootAsync({
      //investigar como pasar esto  a variables de entorno
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,

        logging: false,

        // Muestra las consultas SQL en la consola
      }),
    }),
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
