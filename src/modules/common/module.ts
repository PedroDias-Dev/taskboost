import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TokenGuard } from './guards/token';
import { BindUserMiddleware } from './middlewares/bindUser';
import { NotificationService } from './services/notification';
import { PasswordService } from './services/password';
import { TokenService } from './services/token';
import { UploadService } from './services/upload';
import { UrlService } from './services/url';

@Module({
  imports: [HttpModule],
  providers: [TokenService, NotificationService, PasswordService, UploadService, UrlService, TokenGuard],
  exports: [TokenService, NotificationService, PasswordService, UploadService, UrlService, TokenGuard]
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(BindUserMiddleware).forRoutes('*');
  }
}
