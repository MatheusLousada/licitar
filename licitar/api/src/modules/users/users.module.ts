import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { importsUsers } from './imports/users-imports.config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';

@Module({
  imports: importsUsers,
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})

export class UsersModule {}
