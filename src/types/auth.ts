import { UserType } from "@prisma/client";

export type UserWithToken = {
  name: string;
  adress: string;
  userType: UserType;
  token: string;
};

export type SigninArg = {
  email: string;
  password: string;
};

export type SignupArg = {
  name: string;
  userType: UserType;
  adress: string;
} & SigninArg;
