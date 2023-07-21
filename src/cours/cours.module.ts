import { Module } from '@nestjs/common';
import { CoursController } from './cours.controller';
import { CoursService } from './cours.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cours, CoursSchema } from './cours.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Cours.name, schema: CoursSchema}]) , UsersModule],
  controllers: [CoursController],
  providers: [CoursService],
  exports:[CoursService]
})
export class CoursModule {}
