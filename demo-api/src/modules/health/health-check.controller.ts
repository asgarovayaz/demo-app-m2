import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
@ApiTags('Health check')
class HealthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private readonly databaseCheck: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.databaseCheck.pingCheck('database'),
    ]);
  }
}

export default HealthCheckController;
