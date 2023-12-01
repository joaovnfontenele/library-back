
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { validateUserUseCase } from '../useCases/validateUserUseCase/validateUserUseCase';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserUseCase: validateUserUseCase) {
        super({
            usernameField: 'login'
        });
    }

    async validate(login: string, password: string) {
        return await this.validateUserUseCase.execute({
            login,
            password
        })
    }
}