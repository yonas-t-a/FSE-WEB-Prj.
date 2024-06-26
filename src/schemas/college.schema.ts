import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class College extends Document {
  @Prop({ required: true })
  name: string;
}

export const CollegeSchema = SchemaFactory.createForClass(College);
