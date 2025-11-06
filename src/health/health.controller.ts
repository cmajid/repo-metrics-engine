import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthResponseDto } from './dto/health.response.dto';
import { ResponseDto } from 'src/score/dto/reponse.dto';

@Controller('health')
export class HealthController {

    constructor(private readonly healthService: HealthService) { }

    @Get()
    async getHealthDetails(): Promise<ResponseDto<HealthResponseDto>> {
        return this.healthService.getHealthDetails();
    }
}
