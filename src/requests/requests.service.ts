import { Injectable, UnauthorizedException , NotFoundException , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { UpdateRequestDto } from './dto/update-request.dto';
import { User, UserDocument } from 'src/users/users.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class RequestsService { 

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async update(userId: string,adminId : Promise<UserDocument>) {
      const admin = await this.userModel.findById(adminId).exec();

      if(!admin || !admin.isAdmin){
        throw new UnauthorizedException('Only admin user can make this action');
      }

      const userToActivate = await this.userModel.findById(userId).exec();

      if(!userToActivate){
        throw new NotFoundException('User not found');
      }

      if(userToActivate.isTeacher){
        throw new BadRequestException('User is already a teacher');
      }

      userToActivate.isStudent = false;
      userToActivate.isTeacher = true;
      userToActivate.save();
       return true;
      
      }

      remove(id: number) {
        return `This action removes a #${id} request`;
      }
    
}
