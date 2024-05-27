import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class ContactPerson {
  @Prop({ maxlength: 255 })
  contactFirstName: string;
  @Prop({ maxlength: 255 })
  contactLastName: string;
  @Prop({ maxlength: 255 })
  contactPassword: string;
  @Prop({ maxlength: 255 })
  contactEmail: string;
  @Prop({ maxlength: 255 })
  contactAddress: string;
}

@Schema()
class Organization {
  @Prop({ maxlength: 255 })
  firstName: string;
  @Prop({ maxlength: 255 })
  lastName: string;
  @Prop({ maxlength: 255 })
  email: string;
  @Prop({ maxlength: 255 })
  description: string;
  @Prop({ maxlength: 255 })
  openAiKey: string;
  @Prop()
  contactPerson: ContactPerson;
}

@Schema()
export class User {
  @Prop({ maxlength: 50 }) // Max length of 50 characters
  firstName: string;

  @Prop({ maxlength: 50 }) // Max length of 50 characters
  lastName: string;

  @Prop({ unique: true, maxlength: 255 }) // Max length of 255 characters
  email: string;

  @Prop({ maxlength: 255 }) // Max length of 255 characters
  password: string;

  @Prop({ maxlength: 255 }) // Max length of 255 characters
  address: string;

  @Prop()
  organization: Organization;
}

export const UserSchema = SchemaFactory.createForClass(User);
