import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, User])
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule { }
