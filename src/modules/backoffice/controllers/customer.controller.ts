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

import { CustomerService } from '../services/customer.service';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/customer.contracts';
import { CreateCustomerDto } from '../dtos/customer.dto';
import { User } from '../models/user.model';
import { QueryDto } from '../dtos/query.dto';
import { AccountService } from '../services/account.service';
import { Customer } from '../models/customer.models';
import { Result } from '../models/result.model';
import { UpdateCustomerContract } from '../contracts/customer/update-customer-contract';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CreateCreditCard } from '../contracts/customer/credit-card.contrat';
import { CreditCard } from '../models/credit-car.model';
import { CreateQueryContract } from '../contracts/customer/query.contract';

/**
 * O nome do controller é a rota de acesso
 * é necessário decorar com os metódos
 * localhost:3000/customer
 */
@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

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
        [],
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

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(null, false, null, error.error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/cartaoCredito')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCard()))
  async createCreditCard(
    @Param('document') document,
    @Body() model: CreditCard,
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);

      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Erro ao cadastrar cartão de crédito',
          false,
          null,
          error.error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();
    return new Result(null, true, customers, null);
  }

  @Get(':document')
  async get(@Param('document') document) {
    const customer = await this.customerService.find();
    return new Result(null, true, customer, null);
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new CreateQueryContract()))
  async query(@Body() model: QueryDto) {
    const customers = await this.customerService.query(model);
    return new Result(null, true, customers, null);
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
