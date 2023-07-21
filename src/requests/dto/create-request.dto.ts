import { IsNotEmpty } from "class-validator";
export class CreateRequestDto {
    @IsNotEmpty()
    _id : string
}
