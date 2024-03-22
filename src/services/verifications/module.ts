import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { isProd } from '@libs/common';
import { UserRepository } from '../users/infrastructure/repository';
import { VerificationController } from './presentation/controller';
import { UserModule } from '../users/module';
import { VerificationService } from './application/service';
import { VerificationRepository } from './infrastructure/repository';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: isProd,
        auth: {
          user: process.env.MAIL_HOST,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"ParrotWorld" <noreply@parrotworld.com>',
      },
    }),
    UserModule,
  ],
  controllers: [VerificationController],
  providers: [UserRepository, VerificationService, VerificationRepository],
})
export class VerificationModule {}
