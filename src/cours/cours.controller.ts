import { Controller , Post , UseGuards , Body , Req } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CreateCoursDto } from './dto/create-cours.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('cours')
export class CoursController {
    constructor(private readonly coursService: CoursService){}

    @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCoursDto: CreateCoursDto, @Req() req) {
    return this.coursService.create(createCoursDto, req.user.id);
  }
}
