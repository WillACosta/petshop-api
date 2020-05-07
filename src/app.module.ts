import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from './backoffice/backoffice.module';

import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [BackofficeModule, MongooseModule.forRoot('mongodb+srv://will:will@cluster0-zl2pt.azure.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
