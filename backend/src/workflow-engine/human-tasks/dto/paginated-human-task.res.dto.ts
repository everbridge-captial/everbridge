import { PaginationRes } from '@common/base';
import { HumanTaskResponseDto } from './human-task.res.dto';

export class PaginatedHumanTaskResponseDto extends PaginationRes<HumanTaskResponseDto> {}
