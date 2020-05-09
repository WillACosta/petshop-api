import { AdressType } from './../enums/adress.type';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.models';
import { Adress } from '../models/adress.model';

@Injectable()
export class AdressService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  /**
   * Bancos NOSql podem buscar um registro e já atualizar
   * @param document
   * @param data
   */
  async create(
    document: string,
    data: Adress,
    type: AdressType,
  ): Promise<Customer> {
    const options = { upsert: true }; //Cria o registro caso não exista no banco
    /**
     * Atualiza apenas uma parte do objeto, depois de fazer uma busca
     * pelo documento
     */
    if (type == AdressType.Billing) {
      return await this.model.findOneAndUpdate(
        { document },
        {
          $set: {
            billingAdress: data,
          },
        },
        options,
      );
    } else {
      return await this.model.findOneAndUpdate(
        { document },
        {
          $set: {
            shippingAdress: data,
          },
        },
        options,
      );
    }
  }
}
