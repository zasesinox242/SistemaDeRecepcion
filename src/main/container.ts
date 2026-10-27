import { CheckBackendConnection } from '../application/use-cases/CheckBackendConnection';
import { ParseReceivedQuantity } from '../application/use-cases/ParseReceivedQuantity';
import { FirestoreConnectionCheck } from '../infrastructure/firebase/FirestoreConnectionCheck';

export const container = {
  parseQuantity: new ParseReceivedQuantity(),
  checkConnection: new CheckBackendConnection(new FirestoreConnectionCheck()),
};
