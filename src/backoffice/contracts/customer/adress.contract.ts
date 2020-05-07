import { Contract } from '../contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { Adress } from 'src/backoffice/models/adress.model';

@Injectable()
export class CreateAdressContract implements Contract {
  errors: any[];

  validate(model: Adress): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
    flunt.hasMinLen(model.street, 3, 'Rua inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
