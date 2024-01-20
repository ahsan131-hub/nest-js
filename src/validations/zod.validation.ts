
import { ZodSchema  } from 'zod';
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException('Validation failed');
        }
    }
}
