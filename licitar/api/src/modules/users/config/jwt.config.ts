import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (config: ConfigService): JwtModuleOptions => {
  const expiresIn = config.get<string>('JWT_EXPIRES');
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + parseInt(expiresIn));

  return {
    secret: config.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: Math.floor(expirationTime.getTime() / 1000)
    },
  };
};
