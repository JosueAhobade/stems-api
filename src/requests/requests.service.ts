import { Injectable, UnauthorizedException , NotFoundException , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { UpdateRequestDto } from './dto/update-request.dto';
import { User, UserDocument } from 'src/users/users.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { threadId } from 'worker_threads';
import { RequestDocument } from './requests.schema';
import { Contact, ContactDocument } from 'src/contacts/contacts.schema';
import { FindRequestDto } from './dto/find-requests.dto';

@Injectable()
export class RequestsService { 

    constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>,
                @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
                private userServices: UsersService){}

    // async update(userId: string,adminId : Promise<UserDocument>) {
    //   const admin = await this.userModel.findById(adminId).exec();

    //   if(!admin || !admin.isAdmin){
    //     throw new UnauthorizedException('Only admin user can make this action');
    //   }

    //   const userToActivate = await this.userModel.findById(userId).exec();

    //   if(!userToActivate){
    //     throw new NotFoundException('User not found');
    //   }

    //   if(userToActivate.isTeacher){
    //     throw new BadRequestException('User is already a teacher');
    //   }

    //   userToActivate.isStudent = false;
    //   userToActivate.isTeacher = true;
    //   userToActivate.save();
    //    return true;
      
    //   }

      async create(createRequestDto : CreateRequestDto , sender : UserDocument ){
        
        const receiver = await this.userServices.findOne(createRequestDto.receiverId);

        if(sender.id == receiver.id)
          throw new BadRequestException("You can not send request to yourself");

        const request = await this.requestModel.findOne(
          {
            $or:[{
              receiver: receiver.id,
              sender: sender.id
            },
            {
              receiver: sender.id,
              sender: receiver.id
            }]
          }
        );
        if(request)
        {
          if(request.sender == sender.id)
            throw new BadRequestException("You have already send a request to this receiver");
          else 
            throw new BadRequestException("This receiver has already send to you a request");
        }

        return this.requestModel.create({
          receiver: receiver.id,
          sender: sender.id
        });
            
      }
      // async findAll(filter?: FindRequestDto ){
      //   const requestParams = {}
      //   if(filter.receiverId)
      //     requestParams["receiver"] = filter.receiverId;
      //   if(filter.senderId)
      //     requestParams["sender"] = filter.senderId;
      //   try{
      //     return await  this.requestModel.find(requestParams);
      //   } 
      //   catch(error){
      //     throw new BadRequestException("Invalid params");
      //   } 

      // }

      async findAll(userId: string){
        const requestParams = { receiver: userId}
    
        try{
          return await this.requestModel.find(requestParams)
        }catch(error){
          throw error
        }
       }


      async update(id: String , updateRequestDto: UpdateRequestDto , userId: any){
        try{
          const request = await this.requestModel.findById(id);

          if(request.receiver != userId && request.sender != userId ){
            throw new UnauthorizedException("Impossible to make thi action");
          }
          if(request.accepted){
            if(request.receiver != userId){
              console.log('show request' ,  request,request.receiver,userId,request.receiver != userId)
              throw new UnauthorizedException("Impossible to make thi action");
            }
          }
          const contact = this.contactModel.create({
            user1: userId,
            user2: request.sender
          })
          return this.requestModel.findByIdAndUpdate({_id:id} , updateRequestDto, {new:true,learn:true})
        }catch(error)
        {
          throw error
        }
      }

      findOne(id: number) {
        return `This action returns a #${id} request`;
      }

      remove(id: number) {
        return `This action removes a #${id} request`;
      }
    
}
