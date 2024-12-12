import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  async checkReadiness() {
    return { status: 'ok', date: new Date(Date.now()) };
  }
}
