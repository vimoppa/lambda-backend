import Joi from 'joi';

import { ValidationResponse } from './type';

export class BaseValidation {
  public static parseError(error: Joi.ValidationError) {
    return error ? error.details.map(detail => detail.message).join(', ') : null;
  }

  public static parseErrorResponse(error: Joi.ValidationError): ValidationResponse {
    return { isValid: !error, errors: this.parseError(error) };
  }
}

export default BaseValidation;
