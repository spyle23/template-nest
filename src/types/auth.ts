export type UserWithToken = {
  name: string;
  adress: string;
  isAdmin: boolean;
  token: string;
};

export type SigninArg = {
  email: string;
  password: string;
};

export type SignupArg = {
  name: string;
  isAdmin: boolean;
  adress: string;
} & SigninArg;
