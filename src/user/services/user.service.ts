import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly UserRepository: Repository<UserEntity>) { }

    create(user: User): Observable<User> {
        return from(this.UserRepository.save(user));
    };

    findOne(id: number): Observable<User> {
        return from(this.UserRepository.findOne({ id }))
    };

    findAll(): Observable<User[]> {
        return from(this.UserRepository.find());
    };

    deleteOne(id: number): Observable<any> {
        return from(this.UserRepository.delete(id));
    };

    updateOne(id: number, user: User): Observable<any> {
        return from(this.UserRepository.update(id, user));
    };
}
