import { Body, Controller, Param, Patch, Req, UseGuards, Delete, Post, Get, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { User } from 'src/users/users.schema';
import { FindRequestDto } from './dto/find-requests.dto';

@Controller('requests')
export class RequestsController { 
    constructor(private readonly requestsService: RequestsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req,@Body() createRequestDto: CreateRequestDto) {
      const user = req.user
      return this.requestsService.create(createRequestDto,user);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Req() req) {
      return this.requestsService.findAll(req.user.id);
    }

    @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto, @Req() req) {
    return this.requestsService.update(id, updateRequestDto,req.user.id);
  }

  // @UseGuards(AuthGuard)
  // @Patch(':id/activate-as-teacher')
  // async update(@Param('id') id: string, @Req() req: any) {
  //   return this.requestsService.update(id,req.user.id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.requestsService.remove(+id);
  // }
}
