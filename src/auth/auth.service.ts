import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './dto/jwt.dto';

@Injectable()
export class AuthService {
constructor(private prisma: PrismaService, private jwtService: JwtService) {}

async login(email: string, password: string): Promise<JwtToken> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.users.findUnique({ where: { email: email } });

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
        accessToken: this.jwtService.sign({ userId: user.id }),
    };
}
}