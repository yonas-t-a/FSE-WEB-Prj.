import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Department extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  collegeId: Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
