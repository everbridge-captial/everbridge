import { ApiProperty } from '@nestjs/swagger';

export class HumanTaskResponseDto {
  @ApiProperty()
  id: string;
}
