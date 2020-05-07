import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
  /**
   * Sempre que usar o model como padrão Singleton
   * para ser utilizado em toda a classe uma única vez
   */
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  /**
   * Persiste as informações no banco e retorna
   * a promessa da requisição (Aguarda a resposta)
   * @param data
   */
  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }
}
