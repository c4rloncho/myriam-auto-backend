import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async register(registerUser: RegisterUserDto) {
    const { username, email, password, name } = registerUser;
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictException('Username already exists');
      }
      if (existingUser.email === email) {
        throw new ConflictException('Email already exists');
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      name,
    });
    await this.userRepository.save(newUser);
    return {
      success: true,
      message: 'User registered successfully'
    };
  }


  async login(loginDto: LoginUserDto) {
    const { password, email } = loginDto;
    const user = await this.userRepository.findOne({
      where: [
        { email: email }
      ]
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateToken(user);

  }
  private async generateToken(user: User) {
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_CONSTANT'),
        expiresIn: '1h',
      }),
    };
  }
}
