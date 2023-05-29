import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT'), 10),
      username: configService.get<string>('DB_USERNAME'),
      database: configService.get<string>('DB_DATABASE'),
      password: configService.get<string>('DB_PASSWORD'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true
    }
  }
};

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};