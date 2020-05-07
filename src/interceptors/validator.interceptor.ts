import { Contract } from './../backoffice/contracts/contract';

import {
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Result } from 'src/backoffice/models/result.model';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {

    // const body = context.switchToHttp().getRequest().body;
    // const valid = this.contract.validate(body);

    // if (!valid) {
    //   throw new HttpException(
    //     new Result(
    //       'Erro ao obter os dados!',
    //       false,
    //       null,
    //       this.contract.errors,
    //     ),
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // return stream$.handle().pipe(data => data);
    return stream$.handle().pipe(data => data);
  }
}

// // intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
// //     const body = context.switchToHttp().getRequest().body;
// //     const valid = this.contract.validate(body);

// //     if (!valid) {
// //       throw new HttpException(
// //         new Result(
// //           'Erro ao obter os dados!',
// //           false,
// //           null,
// //           this.contract.errors,
// //         ),
// //         HttpStatus.BAD_REQUEST,
// //       );
// //     }
// //     return call$;
// //   }
