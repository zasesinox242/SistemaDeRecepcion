import { InvalidQuantityError } from '../errors/DomainErrors';

export class ReceivedQuantity {
  private constructor(readonly value: number) {}

  static create(value: number): ReceivedQuantity {
    if (!Number.isInteger(value) || value < 0) throw new InvalidQuantityError(value);
    return new ReceivedQuantity(value);
  }
}
