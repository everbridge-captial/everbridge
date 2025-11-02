import { ApiProperty } from '@nestjs/swagger';
import { OrgType } from '../entities';

export class OrganizationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: OrgType })
  type: OrgType;
}
