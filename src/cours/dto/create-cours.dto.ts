import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty} from 'class-validator'


export class CreateCoursDto {
    @ApiProperty()
    @IsNotEmpty()
    intitule_cours:string

    @ApiProperty()
    @IsNotEmpty()
    intitule_chapitre:string

    @ApiProperty()
    @IsNotEmpty()
    contenu:string

    

}
