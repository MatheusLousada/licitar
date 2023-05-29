import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfigFactory } from '../config/jwt.config';

export const importsUsers = [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: jwtConfigFactory,
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([User])
];