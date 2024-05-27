import {
  BadRequestException,
  ForbiddenException,
  //   ForbiddenException,
  Injectable,
  //   UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/user';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './auth-dto';
import { Auth } from 'src/models/auth.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('auth') private readonly authModel: Model<Auth>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(data: AuthDto) {
    // Check if user exists
    const user: IUser = await this.usersService.findOne(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, user.email, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
  async updateRefreshToken(
    userId: string,
    email: string,
    refreshToken: string,
  ) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.authModel.updateOne(
      { userId: userId },
      {
        refreshToken: hashedRefreshToken,
        email,
      },
      {
        upsert: true,
      },
    );
  }

  async getTokens(userId: string, email: string) {
    console.log(
      'configuration:',
      this.configService.get<string>('JWT_REFRESH_SECRET'),
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user: { email: string; userId: string; refreshToken: string } =
      await this.authModel.findOne({ userId });
    console.log('user=====', user);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, user.email, tokens.refreshToken);
    return tokens;
  }
  async logout(userId: string) {
    await this.authModel.deleteOne({ userId });
  }
}
