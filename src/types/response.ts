export type ResponseForm<T> = {
  success: boolean;
  message: string;
  data: T;
};
