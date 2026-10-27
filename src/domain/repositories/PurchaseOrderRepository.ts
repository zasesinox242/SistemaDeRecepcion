import { PurchaseOrder } from '../entities/PurchaseOrder';

export interface PurchaseOrderRepository {
  saveMany(date: string, orders: readonly PurchaseOrder[]): Promise<void>;
  findByDate(date: string): Promise<PurchaseOrder[]>;
}
