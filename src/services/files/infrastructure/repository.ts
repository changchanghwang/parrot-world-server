import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { File } from '../domain/model';

@Injectable()
export class FileRepository extends Repository<File, File['id']> {
  entityClass = File;
}
