import { collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { PurchaseOrder } from '../../domain/entities/PurchaseOrder';
import { PurchaseOrderRepository } from '../../domain/repositories/PurchaseOrderRepository';
import { db } from './firebaseApp';
import { PurchaseOrderMapper } from './mappers/PurchaseOrderMapper';
import { paths } from './paths';

export class FirestorePurchaseOrderRepository implements PurchaseOrderRepository {
  private col(date: string) {
    return collection(db, paths.days, date, paths.orders);
  }

  async saveMany(date: string, orders: readonly PurchaseOrder[]): Promise<void> {
    const batch = writeBatch(db);
    batch.set(doc(db, paths.days, date), { date, updatedAt: serverTimestamp() }, { merge: true });
    orders.forEach((o) => batch.set(doc(this.col(date), o.orderNumber), PurchaseOrderMapper.toFirestore(o)));
    await batch.commit();
  }

  async findByDate(date: string): Promise<PurchaseOrder[]> {
    const snap = await getDocs(this.col(date));
    return snap.docs.map((d) => PurchaseOrderMapper.toDomain(d.id, d.data()));
  }
}
