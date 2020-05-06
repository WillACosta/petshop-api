import { Result } from './../../models/result.model';
import { Customer } from './../../models/customer.models';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';

/**
 * O nome do controller é a rota de acesso
 * é necessário decorar com os metódos
 * localhost:3000/customer
 */
@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, {}, null);
  }

  @Post()
  // @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  post(@Body() body: Customer) {

    return new Result('Cliente criado com sucesso!', true, body, null);
  }

  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return new Result('Cliente alterado com sucesso!', true, body, null);
  }

  @Delete()
  delete(@Param('document') document) {
    return new Result('Cliente removido com sucesso!', true, null, null);
  }
}
