import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { SiteModule } from './infra/http/modules/site/site.module';
import { BookModule } from './infra/http/modules/book/book.module';
import { StatusModule } from './infra/http/modules/status/status.module';
import { WebScrapingModule } from './infra/webScraping/webScraping.module';
import { ChapterModule } from './infra/http/modules/chapter/chapter.module';

@Module({
  imports: [DatabaseModule ,WebScrapingModule,UserModule, AuthModule,SiteModule, BookModule, StatusModule,ChapterModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
