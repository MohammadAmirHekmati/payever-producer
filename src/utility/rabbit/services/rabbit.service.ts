// src/rabbitmq/rabbitmq.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMqConfigService } from 'src/config/rabbitmq/rabbitmq-config.service';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly rabbitConfigService: RabbitMqConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async connect() {
    try {
      const url = this.rabbitConfigService.rabbitUrl
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  private async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  public async publishMessage(queue: string, message: any) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not available');
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
  }
}