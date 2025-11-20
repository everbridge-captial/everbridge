import { ApiProperty } from '@nestjs/swagger';
import { Upload } from '../entities';

export class UploadResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  constructor(upload: Upload) {
    this.id = upload.id;
    this.filename = upload.filename;
    this.mimetype = upload.mimetype;
    this.size = upload.size;
    this.url = upload.url;
    this.createdAt = upload.createdAt;
  }
}
