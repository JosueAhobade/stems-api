import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contacts.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
