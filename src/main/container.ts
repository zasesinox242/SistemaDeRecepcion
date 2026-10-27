import { CheckBackendConnection } from '../application/use-cases/CheckBackendConnection';
import { ObserveSession } from '../application/use-cases/ObserveSession';
import { ParseReceivedQuantity } from '../application/use-cases/ParseReceivedQuantity';
import { SeedAndReadDemoDay } from '../application/use-cases/SeedAndReadDemoDay';
import { SignIn } from '../application/use-cases/SignIn';
import { SignOut } from '../application/use-cases/SignOut';
import { FirebaseAuthRepository } from '../infrastructure/firebase/FirebaseAuthRepository';
import { FirestoreConnectionCheck } from '../infrastructure/firebase/FirestoreConnectionCheck';
import { FirestorePurchaseOrderRepository } from '../infrastructure/firebase/FirestorePurchaseOrderRepository';

const authRepo = new FirebaseAuthRepository();

export const container = {
  parseQuantity: new ParseReceivedQuantity(),
  checkConnection: new CheckBackendConnection(new FirestoreConnectionCheck()),
  demoDay: new SeedAndReadDemoDay(new FirestorePurchaseOrderRepository()),
  signIn: new SignIn(authRepo),
  signOut: new SignOut(authRepo),
  observeSession: new ObserveSession(authRepo),
};
