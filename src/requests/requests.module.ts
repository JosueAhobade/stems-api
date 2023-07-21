import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),UsersModule],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
