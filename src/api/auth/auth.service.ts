import { Injectable } from '@nestjs/common';
import { Auth, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignupArg, UserWithToken } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: SignupArg): Promise<UserWithToken | null> {
    const { email, name, isAdmin, adress, password } = data;
    const searchAuth: Auth | null = await this.prisma.auth.findUnique({
      where: {
        email,
      },
    });
    if (searchAuth) return null;
    const hashPwd = Bcrypt.hashSync(password, 10);
    const newAuth: Auth = await this.prisma.auth.create({
      data: {
        email,
        password: hashPwd,
      },
    });
    const newUser: User = await this.prisma.user.create({
      data: {
        name,
        isAdmin,
        adress,
        auth: {
          connect: {
            id: newAuth.id,
          },
        },
      },
    });
    await this.prisma.auth.update({
      where: {
        email,
      },
      data: {
        ...newAuth,
        User: {
          create: newUser,
        },
      },
    });
    const token = jwt.sign(
      { email, isAdmin, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    );
    return { name, isAdmin, adress, token } as UserWithToken;
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
    const valid = Bcrypt.compareSync(password, existedAuth.password);
    if (!valid) return null;
    const token = jwt.sign(
      { email, isAdmin: existedAuth.User?.isAdmin, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    );
    return {
      name: existedAuth.User.name,
      isAdmin: existedAuth.User.isAdmin,
      adress: existedAuth.User.adress,
      token,
    };
  }
}
