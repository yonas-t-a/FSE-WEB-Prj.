import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Course } from './course.schema';
import { Department } from './department.schema';

@Schema()
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  profileImage: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: Types.ObjectId, ref: 'Course' }])
  courseFavorites: Course[];

  @Prop([{ type: Types.ObjectId, ref: 'Department' }])
  departmentFavorites: Department[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
