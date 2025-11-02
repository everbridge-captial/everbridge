import { Controller, Get, Query, Inject } from '@nestjs/common';
import { BaseController } from '@common/base/base.controller';
import { Organization, OrgType } from './entities';
import { OrganizationService } from './organizations.service';
import { InternalGuard, OrgJwtGuard } from '@core/auth/guards';
import { Swag } from '@common/decorators/generic-swag.decorator';
import { PaginationQueryDto } from '@common/base';
import { PaginatedOrganizationResponseDto } from './dto/paginated-organization.res.dto';
import { OrganizationResponseDto } from './dto/organization.res.dto';

@Controller('organziations')
export class organziationsController extends BaseController<Organization> {
  constructor(
    @Inject(OrganizationService)
    private readonly organizationService: OrganizationService,
  ) {
    super(organizationService);
  }

  @Swag({
    summary: 'Get all organizations',
    orgTypes: [OrgType.PLATFORM],
    ok: { type: PaginatedOrganizationResponseDto },
    query: PaginationQueryDto,
    bearer: true,
    guards: [OrgJwtGuard, InternalGuard],
    orgHeader: false,
  })
  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedOrganizationResponseDto> {
    const paginatedOrgs = await super._findAll(query);
    const mappedData: OrganizationResponseDto[] = paginatedOrgs.data.map(
      (org) => ({
        id: org.id,
        name: org.name,
        type: org.type,
      }),
    );

    return {
      ...paginatedOrgs,
      data: mappedData,
    };
  }
}
