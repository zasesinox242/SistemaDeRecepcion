import { ParseReceivedQuantity } from '../application/use-cases/ParseReceivedQuantity';

export const container = {
  parseQuantity: new ParseReceivedQuantity(),
};
