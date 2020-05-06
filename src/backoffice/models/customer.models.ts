import { Pet } from './pet.model';
import { Adress } from './adress.model';
import { CreditCard } from './credit-car.model';

export class Customer {
  /**
   * Um construtor pode ajudar a identificar os tipos
   * de dados que a entidade trabalha
   */
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public pets: Pet[],
    public billingAdress: Adress,
    public shippingAdress: Adress,
    public creditCart: CreditCard,
    public password: string,
    public active: boolean,
  ) {}
}
