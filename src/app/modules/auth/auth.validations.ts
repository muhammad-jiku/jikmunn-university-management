import { z } from 'zod';

const loginUserZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenHandlerZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidations = {
  loginUserZodSchema,
  refreshTokenHandlerZodSchema,
};
