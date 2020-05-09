/**
 * Data Transfer Objects
 * Modelo de entrada de dados para cadastrar um novo cliente
 */
export class CreateCustomerDto {

  constructor(
    public name: string,
    public document: string,
    public email: string,
    public password: string,
  ) {}
}
