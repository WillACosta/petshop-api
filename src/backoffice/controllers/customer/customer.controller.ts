import { AccountService } from './../../services/account.service';
import { Result } from './../../models/result.model';
import { Customer } from './../../models/customer.models';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateCustomerContract } from 'src/backoffice/contracts/customer/customer.contracts';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerDto } from 'src/backoffice/dtos/customer.dto';
import { User } from 'src/backoffice/models/user.model';
import { CustomerService } from 'src/backoffice/services/customer.service';
import { Adress } from 'src/backoffice/models/adress.model';
import { CreateAdressContract } from 'src/backoffice/contracts/customer/adress.contract';

/**
 * O nome do controller é a rota de acesso
 * é necessário decorar com os metódos
 * localhost:3000/customer
 */
@Controller('v1/customers')
export class CustomerController {
  /**
   *
   */
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      //Criar usuário
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      //Criar Cliente
      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        null,
        null,
        null,
        null,
        user,
      );
      const res = await this.customerService.create(customer);

      return new Result('Cliente criado com sucesso!', true, res, null);
    } catch (error) {
      //Fazer um rollback
      throw new HttpException(
        new Result('Erro ao cadastrar', false, null, error.error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/endereco/cobranca')
  @UseInterceptors(new ValidatorInterceptor(new CreateAdressContract()))
  async addBillingAdress(@Param('document') document, @Body() model: Adress) {
    try {
      const res = await this.customerService.addBillingAdress(document, model);
      return new Result(null, true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Erro ao cadastrar o endereço de cobrança',
          false,
          null,
          error.error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/endereco/entrega')
  @UseInterceptors(new ValidatorInterceptor(new CreateAdressContract()))
  async addShippingAdress(@Param('document') document, @Body() model: Adress) {
    try {
      await this.customerService.addShippingAdress(document, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Erro ao cadastrar o endereço de entrega',
          false,
          null,
          error.error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Put(':document')
  // put(@Param('document') document, @Body() body) {
  //   return new Result('Cliente alterado com sucesso!', true, body, null);
  // }

  // @Delete()
  // delete(@Param('document') document) {
  //   return new Result('Cliente removido com sucesso!', true, null, null);
  // }
}
