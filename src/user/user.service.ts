import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;

    }
}
