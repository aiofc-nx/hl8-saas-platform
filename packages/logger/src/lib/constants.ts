/**
 * Logger 模块常量定义
 *
 * @description 定义日志模块中使用的常量
 * 避免循环依赖问题
 *
 * @fileoverview 日志模块常量定义文件
 * @author HL8 SAAS Platform Team
 * @since 1.0.0
 */

/**
 * 日志模块参数提供者令牌
 *
 * @description 用于依赖注入的令牌，用于获取日志模块配置参数
 */
export const LOGGER_MODULE_PARAMS = 'LOGGER_MODULE_PARAMS';

/**
 * 日志记录器提供者令牌
 *
 * @description 用于依赖注入的令牌，用于获取日志记录器实例
 */
export const LOGGER_PROVIDER = 'LOGGER_PROVIDER';
