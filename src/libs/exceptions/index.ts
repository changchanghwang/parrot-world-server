import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';

export * from './filter';

type ErrorOption = {
  errorMessage?: string;
};

/**
 * 400 Bad Request
 */
export const badRequest = (message?: string, option?: ErrorOption) => {
  return new BadRequestException({ message, errorMessage: option?.errorMessage });
};

/**
 * 401 Unauthorized
 */
export const unauthorized = (message?: string, option?: ErrorOption) => {
  return new UnauthorizedException({ message, errorMessage: option?.errorMessage });
};

/**
 * 403 Forbidden
 */
export const forbidden = (message?: string, option?: ErrorOption) => {
  return new ForbiddenException({ message, errorMessage: option?.errorMessage });
};

export const conflict = (message?: string, option?: ErrorOption) => {
  return new ConflictException({ message, errorMessage: option?.errorMessage });
};

/**
 * 500 Validation Error(Internal Server Error)
 */
export const validationError = (message?: string, option?: ErrorOption) => {
  return new ValidationErrorException({ message, errorMessage: option?.errorMessage });
};

/**
 * 501 Not Implemented
 */
export const notImplemented = (message?: string, option?: ErrorOption) => {
  return new NotImplementedException({ message, errorMessage: option?.errorMessage });
};

/**
 * 500 Internal Server Error
 */
export const internalServerError = (message?: string, option?: ErrorOption) => {
  return new InternalServerErrorException({ message, errorMessage: option?.errorMessage });
};

export const optimisticLockVersionMismatch = (message?: string, option?: ErrorOption) => {
  return new OptimisticLockVersionMismatchException({ message, errorMessage: option?.errorMessage });
};

export class OptimisticLockVersionMismatchException extends InternalServerErrorException {
  constructor(args: { message?: string } & ErrorOption) {
    super({ message: args.message, errorMessage: args.errorMessage });
  }
}

export class ValidationErrorException extends InternalServerErrorException {
  constructor(args: { message?: string } & ErrorOption) {
    super({ message: args.message, errorMessage: args.errorMessage });
  }
}
