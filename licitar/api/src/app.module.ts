import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { importsConfig } from './imports/app-imports.config';

@Module({
  imports: [...importsConfig],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
