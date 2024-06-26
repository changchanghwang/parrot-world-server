import { ApplicationService } from '@libs/ddd';
import { ulid } from 'ulidx';
import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { FileRepository } from '../infrastructure/repository';
import { File as FileModel } from '../domain/model';
import { Bucket } from '../../../libs/aws';

@Injectable()
export class FileService extends ApplicationService {
  private bucket!: Bucket;

  constructor(private fileRepository: FileRepository) {
    super();
    this.bucket = new Bucket();
  }

  async upload({ file }: { file: Express.Multer.File }) {
    const ulId = ulid();
    const [name, extension] = file.originalname.split('.');
    const stream = createReadStream(file.path);
    const id = `${ulId}.${extension}`;

    await this.bucket.upload(id, stream);
    const uploadFile = new FileModel({
      id,
      name: `${name}.${extension}`,
      contentType: file.mimetype,
      path: this.bucket.bucketId,
    });

    const savedFile = await this.fileRepository.save([uploadFile]);
    return { id: savedFile[0].id, name: savedFile[0].name, publicUrl: await this.bucket.getPublicUrl(savedFile[0].id) };
  }

  async getPublicUrls(ids: string[]) {
    const files = await this.fileRepository.findByIds(ids);

    return Promise.all(
      files.map(async (file) => {
        file.validate();
        return {
          id: file.id,
          name: file.name,
          publicUrl: await this.bucket.getPublicUrl(file.id),
        };
      }),
    );
  }

  async commit(ids: string[]) {
    const files = await this.fileRepository.findByIds(ids);

    files.forEach((file) => {
      file.commit();
    });

    await this.fileRepository.save(files);
  }
}
