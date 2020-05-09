import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose'
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [BackofficeModule, MongooseModule.forRoot('mongodb+srv://will:will@cluster0-zl2pt.azure.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
