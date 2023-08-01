import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contacts.schema';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contacts.dto';

@Injectable()
export class ContactsService {
    constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument> ){
    
    }

    create(createContactDto: CreateContactDto) {
   
    }
}
