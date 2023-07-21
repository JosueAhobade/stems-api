import { Prop, Schema, SchemaFactory , raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/users.schema";
import { File } from "src/file.type";

export type CoursDocument = HydratedDocument<Cours>;

@Schema({timestamps: true, 
   
})
export class Cours{
    @Prop({type: mongoose.Schema.Types.ObjectId,ref: 'User'})
    teacherId: User

    @Prop({required:true})
    intitule_cours:string

    @Prop({required:true})
    intitule_chapitre:string

    @Prop({required:true})
    contenu:string


    @Prop(raw([
        {    
            user : Array<{
                type : mongoose.Schema.Types.ObjectId,
                ref: User
            }> ,
            emoji:String
        }
    ]
    ))

    @Prop({default : Date.now()})
    createdAt : Date

    @Prop()
    updatatedAt : Date

}

export const CoursSchema = SchemaFactory.createForClass(Cours)
