import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhookService: WebhooksService) {}

  @Post('helius')
  async handleHeliusWebhook(@Body() data: HeliusWebhookDto) {
    await this.webhookService.processWebhook(data);
    return { status: 'received' };
  }
}