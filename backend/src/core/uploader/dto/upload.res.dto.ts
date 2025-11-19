import { ApiProperty } from '@nestjs/swagger';

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
}
