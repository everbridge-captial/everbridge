import { PaginationRes } from '@common/base';
import { OrganizationResponseDto } from './organization.res.dto';

export class PaginatedOrganizationResponseDto extends PaginationRes<OrganizationResponseDto> {}