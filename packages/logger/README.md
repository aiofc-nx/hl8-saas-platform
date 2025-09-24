# HL8 SAAS平台日志模块

## 🎯 项目概述

HL8 SAAS平台日志模块是一个专为 Fastify 平台设计的高性能日志记录解决方案。基于 Pino 日志库构建，提供完整的请求上下文绑定、结构化日志输出、异步日志记录等功能。

## ✨ 主要特性

### 🚀 高性能日志记录
- 基于 Pino 日志库，性能优异（比 Winston 快 5-10 倍）
- 支持异步日志记录，进一步提升性能
- 结构化 JSON 输出，便于日志分析和处理

### 🔗 请求上下文绑定
- 自动绑定请求上下文到日志
- 支持请求ID、用户ID、追踪ID等上下文信息
- 使用 AsyncLocalStorage 实现上下文传递

### ⚡ Fastify 专用优化
- 专为 Fastify 平台设计
- 支持 Fastify 中间件和插件
- 完整的请求/响应日志记录

### 🎨 装饰器支持
- 支持日志注入装饰器
- 支持性能监控装饰器
- 支持错误处理装饰器

### 🏗️ 模块化设计
- 支持全局和局部模块配置
- 支持同步和异步配置方式
- 完整的依赖注入支持

## 📦 安装

```bash
pnpm add @hl8/logger
```

## 🚀 快速开始

### 基本用法

```typescript
import { LoggerModule, FastifyLogger, NestJSLogger, InjectLogger } from '@hl8/logger';

// 配置模块
@Module({
  imports: [LoggerModule.forRoot({
    config: {
      level: 'info',
      destination: { type: 'file', path: './logs/app.log' }
    }
  })],
})
export class AppModule {}

// 使用高性能日志服务
@Injectable()
export class UserService {
  @InjectLogger('UserService')
  private readonly logger: FastifyLogger;

  async createUser(userData: any) {
    this.logger.info('Creating user', { userData });
    // 业务逻辑
  }
}

// 使用 NestJS 兼容日志服务
@Injectable()
export class AuthService {
  private readonly logger = new NestJSLogger({
    level: 'info',
    destination: { type: 'file', path: './logs/auth.log' }
  });

  async login(credentials: any) {
    this.logger.log('User login attempt', 'AuthService');
    // 业务逻辑
  }
}
```

### Fastify 中间件配置

```typescript
import { registerFastifyLogger } from '@hl8/logger';

const app = fastify();

// 注册日志中间件
await registerFastifyLogger(app, {
  enableRequestLogging: true,
  enableResponseLogging: true,
  excludePaths: ['/health', '/metrics']
});
```

## 🎨 装饰器用法

### 日志注入装饰器

```typescript
@Injectable()
export class UserService {
  @InjectLogger('UserService')
  private readonly logger: FastifyLogger;

  async createUser(userData: any) {
    this.logger.info('Creating user', { userData });
  }
}
```

### 性能监控装饰器

```typescript
@Injectable()
export class UserService {
  @LogPerformance({ threshold: 1000, level: 'warn' })
  async processUsers(users: User[]) {
    // 方法实现
  }
}
```

### 错误处理装饰器

```typescript
@Injectable()
export class UserService {
  @LogError({ includeStack: true, level: 'error' })
  async deleteUser(userId: string) {
    // 方法实现
  }
}
```

### 方法日志装饰器

```typescript
@Injectable()
export class UserService {
  @LogMethod({ level: 'info', message: 'User creation started' })
  async createUser(userData: any) {
    // 方法实现
  }
}
```

## ⚙️ 配置选项

### 日志级别

```typescript
type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
```

### 输出目标

```typescript
interface LogDestination {
  type: 'console' | 'file' | 'stream';
  path?: string;
  stream?: NodeJS.WritableStream;
  append?: boolean;
  rotation?: LogRotation;
}
```

### 日志轮转

```typescript
interface LogRotation {
  maxSize?: string;
  maxFiles?: number;
  datePattern?: string;
  compress?: boolean;
}
```

## 📝 使用示例

### 同步配置

```typescript
@Module({
  imports: [LoggerModule.forRoot({
    config: {
      level: 'info',
      destination: { type: 'file', path: './logs/app.log' },
      format: { timestamp: true, colorize: true }
    },
    enableRequestLogging: true,
    enableResponseLogging: true
  })],
})
export class AppModule {}
```

### 异步配置

```typescript
@Module({
  imports: [LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      config: {
        level: config.get('LOG_LEVEL'),
        destination: { type: 'file', path: config.get('LOG_PATH') }
      },
      enableRequestLogging: config.get('ENABLE_REQUEST_LOGGING'),
      enableResponseLogging: config.get('ENABLE_RESPONSE_LOGGING')
    })
  })],
})
export class AppModule {}
```

### 环境配置

```typescript
const configs = {
  development: {
    level: 'debug',
    destination: { type: 'console' },
    format: { timestamp: true, colorize: true }
  },
  production: {
    level: 'info',
    destination: { 
      type: 'file', 
      path: './logs/app.log',
      rotation: { maxSize: '10MB', maxFiles: 5 }
    }
  }
};
```

## 🔧 高级用法

### 自定义请求ID生成器

```typescript
await registerFastifyLogger(app, {
  requestIdGenerator: (req) => req.headers['x-request-id'] as string || generateId()
});
```

### 路径排除配置

```typescript
await registerFastifyLogger(app, {
  excludePaths: ['/health', '/metrics', '/favicon.ico']
});
```

### 自定义日志格式化

```typescript
const logger = new FastifyLogger({
  level: 'info',
  destination: { type: 'file', path: './logs/app.log' },
  format: {
    timestamp: true,
    colorize: false,
    levelFirst: true
  }
});
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:cov

# 运行 e2e 测试
pnpm test:e2e
```

## 📚 API 文档

### FastifyLogger

高性能日志记录器，基于 Pino 构建。

#### 方法

- `trace(message: string, ...args: unknown[]): void`
- `debug(message: string, ...args: unknown[]): void`
- `info(message: string, ...args: unknown[]): void`
- `warn(message: string, ...args: unknown[]): void`
- `error(message: string, ...args: unknown[]): void`
- `fatal(message: string, ...args: unknown[]): void`
- `setLevel(level: LogLevel): void`
- `getLevel(): LogLevel`
- `setContext(context: RequestContext): void`
- `getContext(): RequestContext | undefined`

### FastifyLoggerMiddleware

Fastify 日志中间件，提供自动请求/响应日志记录。

#### 配置选项

- `enableRequestLogging?: boolean` - 是否启用请求日志
- `enableResponseLogging?: boolean` - 是否启用响应日志
- `excludePaths?: string[]` - 排除的路径列表
- `requestIdGenerator?: (request: FastifyRequest) => string` - 请求ID生成器

### 装饰器

- `@InjectLogger(context?: string)` - 日志注入装饰器
- `@LogMethod(options)` - 方法日志装饰器
- `@LogPerformance(options)` - 性能监控装饰器
- `@LogError(options)` - 错误处理装饰器
- `@LogLevel(level)` - 日志级别装饰器
- `@LogContext(context)` - 日志上下文装饰器

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

## 📄 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Pino](https://getpino.io/) - 高性能日志库
- [Fastify](https://www.fastify.io/) - 快速、低开销的 Web 框架
- [NestJS](https://nestjs.com/) - 渐进式 Node.js 框架