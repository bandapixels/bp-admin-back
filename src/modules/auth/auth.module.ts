import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/jwt-auth.roles.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig } from '../config/models/auth.config';
import { AppConfigService } from '../config/app.config.service';
import { AppConfigModule } from '../config/app.config.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule, ConfigModule],
      inject: [AuthConfig],
      useFactory: async (authConfig: AuthConfig) => {
        const { jwtSecret, jwtExpiration } = authConfig;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpiration,
          },
        };
      },
    }),
  ],
  providers: [
    AuthConfig,
    AppConfigService,
    AuthConfig,
    JwtStrategy,
    AuthService,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
