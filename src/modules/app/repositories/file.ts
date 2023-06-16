import { Injectable } from '@nestjs/common';
import { UploadService } from 'modules/common/services/upload';

@Injectable()
export class FileRepository {
  public async upload(file: Express.Multer.File): Promise<string> {
    const service = new UploadService();

    return service.save(file.originalname, file.buffer.toString('base64'));
  }

  public async getPath(filename: string): Promise<string> {
    const service = new UploadService();
    return service.getPath(filename);
  }
}
