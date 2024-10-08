import Koa from 'koa';
import jwt from 'jsonwebtoken';

export const createToken = (userInfo: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userInfo,
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verifyToken = (required = true) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const token = ctx.headers.authorization?.replace(/Bearer\s/, '');
    if (token) {
      try {
        ctx.userInfo = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        ctx.throw(401, 'token validation error');
      }
    } else if (required) {
      ctx.throw(401, 'token missing');
    }
    await next();
  };
};
