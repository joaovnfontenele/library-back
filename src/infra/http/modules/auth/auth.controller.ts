import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase/signInUseCase";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { Public } from "./decorators/isPublic";


@Controller()
export class AuthController {
    constructor(private signUseCase: SignInUseCase) { }

    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() request: AuthRequestModel) {
        const access_token = await this.signUseCase.execute({
            user: request.user
        })

        return { access_token }
    }

}