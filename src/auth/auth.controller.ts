import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController { constructor(private authService: AuthService) {} 

    @Post('login')
    async login(@Body() body) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body) {
        return this.authService.register(body.username, body.password, body.role);
    }
}
