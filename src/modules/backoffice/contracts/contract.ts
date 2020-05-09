/**
 * Design Contract: Definie o que a requisição precisa
 * atender para que os dados sejam persistidos
 */
export interface Contract {
  errors: any[];
  validate(model: any): boolean;
}
