import { CustomerController } from './controllers/customer/customer.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [CustomerController]
})
export class BackofficeModule {}
