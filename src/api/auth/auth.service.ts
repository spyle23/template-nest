import { Injectable } from '@nestjs/common';
import { Auth, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SignupArg, UserWithToken } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: SignupArg): Promise<UserWithToken | null> {
    const { email, name, userType, adress, password } = data;
    const searchAuth: Auth | null = await this.prisma.auth.findUnique({
      where: {
        email,
      },
    });
    if (searchAuth) return null;
    const hashPwd = hashSync(password, 10);
    const newAuth: Auth = await this.prisma.auth.create({
      data: {
        email,
        password: hashPwd,
      },
    });
    const newUser: User = await this.prisma.user.create({
      data: {
        name,
        userType,
        adress,
        auth: {
          connect: {
            id: newAuth.id,
          },
        },
      },
    });
    const token = sign(
      { userId: newUser.id ,email, userType, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    );
    return { name, userType, adress, token } as UserWithToken;
  }

  async signin(data: Prisma.AuthCreateInput): Promise<UserWithToken | null> {
    const { email, password } = data;
    const existedAuth = await this.prisma.auth.findUnique({
      where: {
        email,
      },
      include: {
        User: true,
      },
    });
    if (!existedAuth) return null;
    if (!existedAuth.User) return null;
    const valid = compareSync(password, existedAuth.password);
    if (!valid) return null;
    const token = sign(
      { email, userType: existedAuth.User.userType, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    );
    return {
      name: existedAuth.User.name,
      userType: existedAuth.User.userType,
      adress: existedAuth.User.adress,
      token,
    };
  }
}
