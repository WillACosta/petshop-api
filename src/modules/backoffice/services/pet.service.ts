import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.models';
import { Pet } from '../models/pet.model';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(document: string, data: Pet) {
    const options = { upsert: true, new: true }; //Cria um item como um novo registro com id
    return await this.model.findOneAndUpdate(
      { document },
      {
        $push: {
          pets: data,
        },
      },
      options,
    );
  }

  async update(document: string, id: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true }; //Cria um item como um novo registro com id
    return await this.model.findOneAndUpdate(
      {
        document,
        'pets._id': id,
      },
      {
        $set: {
          'pets.$': data, //Atualiza o registro encontrado
        },
      },
    );
  }
}
