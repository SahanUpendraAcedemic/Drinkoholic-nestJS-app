import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Drinkoholic-proxy' })
export class User {
  @Prop()
  firebaseId: string;

  @Prop()
  name: string;

  @Prop()
  bod: Date;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
