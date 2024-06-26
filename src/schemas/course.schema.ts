import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  courseInfo: string;

  @Prop([{ type: Types.ObjectId, ref: 'Course' }])
  preRequisite: Course[];

  @Prop()
  syllabus: string;

  @Prop()
  externalLink: string;

  @Prop([{ id: String, name: String, author: String, category: String }])
  books: Record<string, any>[];

  @Prop([{ id: String, name: String, link: String }])
  lectureVideos: Record<string, any>[];

  @Prop([{ id: String, name: String }])
  lectureAudios: Record<string, any>[];

  @Prop([{ year: String, examQuestion: String, solution: String }])
  exams: Record<string, any>[];

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  departmentId: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
