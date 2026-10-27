import { CheckBackendConnection } from '../application/use-cases/CheckBackendConnection';
import { ParseReceivedQuantity } from '../application/use-cases/ParseReceivedQuantity';
import { SeedAndReadDemoDay } from '../application/use-cases/SeedAndReadDemoDay';
import { FirestoreConnectionCheck } from '../infrastructure/firebase/FirestoreConnectionCheck';
import { FirestorePurchaseOrderRepository } from '../infrastructure/firebase/FirestorePurchaseOrderRepository';

export const container = {
  parseQuantity: new ParseReceivedQuantity(),
  checkConnection: new CheckBackendConnection(new FirestoreConnectionCheck()),
  demoDay: new SeedAndReadDemoDay(new FirestorePurchaseOrderRepository()),
};
