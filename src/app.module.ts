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

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/personnel-api'),UsersModule, AuthModule,CoursModule,
  ConfigModule.forRoot(),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
  RequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
