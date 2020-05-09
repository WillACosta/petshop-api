import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/customer/pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';

/**
 * O nome do controller é a rota de acesso
 * é necessário decorar com os metódos
 * localhost:3000/customer
 */
@Controller('v1/pet')
export class PetController {
  /**
   *
   */
  constructor(private readonly service: PetService) {}

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document, @Body() model: Pet) {
    try {
      await this.service.create(document, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result('Erro ao cadastrar o pet', false, null, error.error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document,
    @Param('id') id,
    @Body() model: Pet,
  ) {
    try {
      await this.service.update(document, id, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Erro ao cadastrar o pet', false, null, error.error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
