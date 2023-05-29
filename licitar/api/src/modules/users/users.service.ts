import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validateToken.dto';

interface DecodedToken {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string, user: {name: string, email: string} }> {
    const { name, email, username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });
      if (existingUser) {
        throw new BadRequestException('Já existem uma conta com este username ou email');
      }

      const newUser = this.usersRepository.create({
        name,
        email,
        username,
        password: hashedPassword
      });

      const user = await this.usersRepository.save(newUser);
      const token = this.jwtService.sign({ id: user.id, name: user.name, username: user.username, email: user.email });
      return { 
        token: token,
        user: {name: user.name, email: user.email} 
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string, user: {name: string, email: string} }> {
    const { email, password } = loginDto;

    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Email ou senha inválida.');
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Email ou senha inválida.');
      }

      const token = this.jwtService.sign({ id: user.id, name: user.name, username: user.username, email: user.email });
      return { 
        token: token,
        user: {name: user.name, email: user.email} 
      };
    } catch (error) {
      throw error;
    }
  }

  async validateToken(validateTokenDto: ValidateTokenDto): Promise<{user: {}} | false> {
    const { token } = validateTokenDto;

    try {
      const decodedToken = this.jwtService.decode(token) as DecodedToken;
      const user = await this.usersRepository.findOne({
        where: { email: decodedToken.email, username: decodedToken.username, name: decodedToken.name },
      });

      if (!user) 
        return false;

      return {
        user: {
          "name": user.name,
          "email": user.email,
          "username": user.username,
        }
      };
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error.message);
      return false;
    }
  }
}
