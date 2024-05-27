import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ maxlength: 255 }) // Max length of 50 characters
  jwtToken: string;

  @Prop({ maxlength: 255 }) // Max length of 50 characters
  refreshToken: string;

  @Prop({ maxlength: 50 }) // Max length of 50 characters
  timeout: string;

  @Prop({ unique: true, maxlength: 255 }) // Max length of 255 characters
  userId: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
