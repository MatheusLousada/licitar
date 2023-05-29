import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validateToken.dto';

@Controller('users')
export class UsersController {
    constructor( private usersService: UsersService) {}

    @Post('/register')
    register(@Body() registerDto: RegisterDto):Promise<{token: string}> {
        return this.usersService.register(registerDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto):Promise<{token: string, user: {}}> {
        return this.usersService.login(loginDto);
    }

    @Post('/validateToken')
    validateToken(@Body() validateTokenDto: ValidateTokenDto):Promise<{user: {}} | false> {
        return this.usersService.validateToken(validateTokenDto);
    }
}
