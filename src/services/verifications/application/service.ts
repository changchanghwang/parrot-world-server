import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@libs/ddd';
import { UserRepository } from '@users/infrastructure/repository';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationRepository } from '../infrastructure/repository';
import { Verification, VerificationType } from '../domain/model';
import { badRequest } from '../../../libs/exceptions';
import { ValidVerificationSpec } from '../domain/specs';

@Injectable()
export class VerificationService extends ApplicationService {
  constructor(
    private verificationRepository: VerificationRepository,
    private userRepository: UserRepository,
    private mailerService: MailerService,
  ) {
    super();
  }

  async start({ email, type }: { email: string; type: VerificationType }) {
    const [user] = await this.userRepository.find({ email });

    if (type === 'SIGNUP' && user) {
      throw badRequest(`Invalid email(${email}) is entered. Please check the email.`, {
        errorMessage: `이미 존재하는 이메일입니다.`,
      });
    }

    const verification = Verification.from({ to: email, type });
    await this.verificationRepository.save([verification]);
    // TODO: event로 분리, 분리하게되었을때 expiredAt은..?
    await this.send(verification);
    return { id: verification.id, expiredAt: verification.expiredAt! };
  }

  async confirm(id: string, { code }: { code: string }) {
    const [verification] = await this.verificationRepository.findSpec(new ValidVerificationSpec({ id }));

    verification.verify(code);
    await this.verificationRepository.save([verification]);
  }

  private async send(verification: Verification) {
    await this.dataSource.createEntityManager().transaction(async (txManager) => {
      // TODO: templateRepository를 만들어서 subject,text,html 등을 반환하는 메서드를 만들어 분리할 수 있게 수정해야할 것 같음.
      if (verification.type === 'SIGNUP') {
        await this.mailerService.sendMail({
          to: verification.to,
          from: 'noreply@parrotworld.co.kr',
          subject: '[Parrot World] 이메일 인증 코드입니다.',
          text: '이메일 인증 코드입니다. 해당 코드를 입력해주세요!',
          html: `
          <div style="max-width:600px; margin:auto">
            <div style="margin:auto; display:flex; flex-direction:column; gap:32px;">
              <img alt="parrot-world" style="aspect-ratio:auto 1463 / 574; width:200px;" src="https://parrot-world-img.s3.ap-northeast-2.amazonaws.com/logo.png" />
              <p style="font-size:26px; font-weight: bold;">
                이메일 인증을 진행해주세요
              </p>
              <div>
                <p>
                  앵무새 세상을 이용해주셔서 감사합니다 :)
                </p>
                <p>
                  가입을 위해 아래 인증번호를 화면에 입력해주세요.
                </p>
              </div>
              <div style="height:5rem;background-color:#E3E3FF;text-align:center; vertical-align:middle;">
                <span style="font-size: 3rem; font-weight: bold; letter-spacing: 8px;">
                  ${verification.code}
                </span>
              </div>
              <span>
                  본 인증번호의 유효기간은 3분 입니다.
              </span>
            </div>
          </div>
          `,
        });
      }
      verification.sent();
      await this.verificationRepository.save([verification], txManager);
    });
  }
}
