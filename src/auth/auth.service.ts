import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(username: string, password: string, role: string) {
        return this.usersService.createUser(username, password, role);
    }
}
