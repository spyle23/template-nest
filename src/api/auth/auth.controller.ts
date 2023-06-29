import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninArg, SignupArg, UserWithToken } from 'src/types/auth';
import { ResponseForm } from 'src/types/response';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() data: SignupArg,
  ): Promise<ResponseForm<UserWithToken | null>> {
    const auth = await this.authService.signup(data);
    const response: ResponseForm<UserWithToken | null> = {
      success: auth ? true : false,
      message: auth ? 'user authenticated' : 'user already exist',
      data: auth,
    };
    return response;
  }

  @Post('/signin')
  async signin(@Body() data: SigninArg) {
    const auth = await this.authService.signin(data);
    const response: ResponseForm<UserWithToken | null> = {
      success: auth ? true : false,
      message: auth ? 'user authenticated' : 'email or password incorect',
      data: auth,
    };
    return response;
  }
}
