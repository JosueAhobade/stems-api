import { Injectable , NotFoundException , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cours , CoursDocument } from './cours.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateCoursDto } from './dto/create-cours.dto';
import { User, UserDocument } from 'src/users/users.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CoursService {
    constructor(@InjectModel(Cours.name) 
    private coursModel: Model<CoursDocument>,
    private userModel: UsersService,
    ) {}

    async create(createCoursDto: CreateCoursDto , teacherId: string){

        const teacher = await this.userModel.findOne(teacherId).exec();

        if(!teacher){
            throw new NotFoundException('Teacher not found');
        }
        if(!teacher.isTeacher){
            throw new UnauthorizedException('Only teacher can to this action');
        }
       return this.coursModel.create({
        ...createCoursDto,
        teacherId: teacherId,
       /* intitule_cours: createCoursDto.intitule_cours,
        intitule_chapitre: createCoursDto.intitule_chapitre,
        contenu: createCoursDto.contenu*/
    });
    }


}
