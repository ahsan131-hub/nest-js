import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './auth-dto';
import { RefreshTokenGuard } from 'src/gaurds/refresh-token.gaurds';
import { AccessTokenGuard } from 'src/gaurds/access-token.gaurds';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthDto) {
    console.log(signInDto);

    try {
      const tokens: { accessToken: string; refreshToken: string } =
        await this.authService.signIn(signInDto);
      if (tokens.accessToken) {
        return {
          status: 200,
          message: 'Successfully update user',
          data: tokens,
        };
      }
    } catch (e) {
      console.log('Error :', e.message);
      return {
        status: 400,
        message: `Error :${e.message}`,
      };
    }
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    const accessToken = await this.authService.refreshTokens(
      userId,
      refreshToken,
    );
    return accessToken;
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}
