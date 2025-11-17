import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { payloadSchema } from './schema';

/**
 * Result of payload validation
 */
export interface ValidationResult {
  /** Whether the payload is valid */
  valid: boolean;
  /** Array of error messages if validation failed */
  errors?: string[];
}

/**
 * Validates payload configuration against JSON Schema
 *
 * This function ensures that the user-provided payload matches the required
 * structure for the landing page generator. It validates:
 * - Required fields (global.title, global.description, navigation)
 * - Data types and formats (URLs, hex colors)
 * - Navigation structure and nesting
 * - Theme color values
 *
 * @param payload - User-provided payload object to validate
 * @returns Validation result with detailed error messages if invalid
 *
 * @example
 * ```typescript
 * import { validatePayload } from './lib/payload/validator';
 * import payload from './payload/config';
 *
 * const result = validatePayload(payload);
 * if (!result.valid) {
 *   console.error('Payload validation failed:');
 *   result.errors?.forEach(err => console.error(`  - ${err}`));
 *   process.exit(1);
 * }
 * ```
 */
export function validatePayload(payload: unknown): ValidationResult {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const validate = ajv.compile(payloadSchema);
  const valid = validate(payload);

  if (!valid && validate.errors) {
    return {
      valid: false,
      errors: validate.errors.map((err) => `${err.instancePath || 'root'} ${err.message}`),
    };
  }

  return { valid: true };
}
