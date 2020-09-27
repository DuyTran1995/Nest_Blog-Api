import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { hasRoles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private readonly configService: ConfigService
    ) { }

    @Post()
    create(@Body() user: User): Observable<User> {
        return this.userService.create(user);
    };

    @Post('login')
    login(@Body() user: User): Observable<any> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { accessToken: jwt }
            })
        )
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Observable<User> {
        return this.userService.findOne(id);
    };

    @Get()
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({
            page,
            limit,
            route: `${this.configService.get('HOSTNAME')}:${this.configService.get('port')}/users`
        })

    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.userService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }

}
