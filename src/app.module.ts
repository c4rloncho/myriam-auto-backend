import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config';
import { DocumentCategoryModule } from './document-category/document-category.module';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    VehicleModule,
    DocumentModule,
    DocumentCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
