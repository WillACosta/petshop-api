import { PetController } from './controllers/pet.controller';
import { AdressService } from './services/adress.service';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { PetService } from './services/pet.service';
import { AdressController } from './controllers/adress.controller';
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AdressController, CustomerController, PetController],
  providers: [AccountService, CustomerService, AdressService, PetService],
})
export class BackofficeModule {}
