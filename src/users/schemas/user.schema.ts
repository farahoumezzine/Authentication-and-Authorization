import { Schema as MongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
