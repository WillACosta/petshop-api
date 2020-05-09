import { Contract } from '../contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { Adress } from '../../models/adress.model';
import { CreditCard } from '../../models/credit-car.model';

@Injectable()
export class CreateCreditCard implements Contract {
  errors: any[];

  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Nome inválido');
    flunt.hasMinLen(model.number, 16, 'Número inválido');
    flunt.hasMinLen(model.expiration, 4, 'Expiração inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
