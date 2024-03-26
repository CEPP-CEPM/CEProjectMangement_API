import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { JwtToken } from './dto/jwt.dto';
import { JwtPayload } from 'src/interfaces/jwt.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async generateJwt(payload: JwtPayload): Promise<JwtToken> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * this.configService.get<number>('jwt.expire'),
      secret: this.configService.get<string>('jwt.secret'),
    });
    return { accessToken: token };
  }

  private client() {
    return new OAuth2Client(
      this.configService.get<string>('google.clientId'),
      this.configService.get<string>('google.secret'),
    );
  }

  private async verifyToken(idToken: string) {
    const client = this.client();
    return await client.verifyIdToken({
      idToken: idToken,
      audience: this.configService.get<string>('google.clientId'),
    });
  }

  async login(loginDto: LoginDto) {
    const token = await this.verifyToken(loginDto.credential);
    const email = token.getPayload().email;
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    // const isPasswordValid = user.password === password;

    // If password does not match, throw an error
    // if (!isPasswordValid) {
    // throw new UnauthorizedException('Invalid password');
    // }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      // accessToken: this.generateJwt({ sub: user.id, role: user.role }),
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
