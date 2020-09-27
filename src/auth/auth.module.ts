import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('jwtSecret'),
        signOptions: { expiresIn: ConfigService.get('expiresIn') }
      })
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
