import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { RequestSchema } from './requests.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),UsersModule, ContactsModule],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
