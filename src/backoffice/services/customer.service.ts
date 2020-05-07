import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.models';
import { Adress } from '../models/adress.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  /**
   * Bancos NOSql podem buscar um registro e já atualizar
   * @param document
   * @param data
   */
  async addBillingAdress(document: string, data: Adress) {
    const options = { upsert: true }; //Cria o registro caso não exista no banco
    /**
     * Atualiza apenas uma parte do objeto, depois de fazer uma busca
     * pelo documento
     */
    return await this.model.findOneAndUpdate({ document }, {
      $set: {
        billingAdress: data,
      }
    }, options);
  }

  async addShippingAdress(document: string, data: Adress) {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate({ document }, {
      $set: {
        shippingAdress: data,
      }
    }, options);
  }
}
