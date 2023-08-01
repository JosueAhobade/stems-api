import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';
import { CoursModule } from './cours/cours.module';
import { ContactsService } from './contacts/contacts.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/personnel-api'),UsersModule, AuthModule,CoursModule,
  ConfigModule.forRoot(),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
  RequestsModule,
  ContactsModule
  ],
  controllers: [AppController],
  providers: [AppService, ContactsService],
})
export class AppModule {}
