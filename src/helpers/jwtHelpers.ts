import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const createResetToken = (
  payload: any,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime,
  });
};

const verifyToken = (payload: string, secret: Secret): JwtPayload => {
  return jwt.verify(payload, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  createResetToken,
  verifyToken,
};
