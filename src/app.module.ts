import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; //1
import { MongooseModule } from '@nestjs/mongoose'; //2
import { AdminModule } from './admins/admin.module';
import { CollegeModule } from './colleges/college.module';
import { CourseModule } from './courses/course.module';
import { DepartmentModule } from './departments/department.module';
import { StudentModule } from './students/student.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/UniSysDatabase'), //2
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
    }), //1
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files
    }),
    AdminModule,
    CollegeModule,
    CourseModule,
    DepartmentModule,
    StudentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
