import { Body, Controller, Param, Patch, Req, UseGuards, Delete, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { User } from 'src/users/users.schema';

@Controller('requests')
export class RequestsController { 
    constructor(private readonly requestsService: RequestsService) {}


  @UseGuards(AuthGuard)
  @Patch(':id/activate-as-teacher')
  async update(@Param('id') id: string, @Req() req: any) {
    return this.requestsService.update(id,req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
