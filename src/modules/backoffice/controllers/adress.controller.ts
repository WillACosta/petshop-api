import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdressService } from '../services/adress.service';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAdressContract } from '../contracts/customer/adress.contract';
import { Adress } from '../models/adress.model';
import { Result } from '../models/result.model';
import { AdressType } from '../enums/adress.type';

/**
 * O nome do controller é a rota de acesso
 * é necessário decorar com os metódos
 * localhost:3000/customer
 */
@Controller('v1/adress')
export class AdressController {
  /**
   *
   */
  constructor(private readonly service: AdressService) {}

  @Post(':document/endereco/cobranca')
  @UseInterceptors(new ValidatorInterceptor(new CreateAdressContract()))
  async create(@Param('document') document, @Body() model: Adress) {
    try {
      const res = await this.service.create(
        document,
        model,
        AdressType.Billing,
      );
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
      await this.service.create(document, model, AdressType.Shipping);
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
}
