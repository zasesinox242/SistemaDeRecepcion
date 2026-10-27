import { PurchaseOrderLine, lineStatus } from './PurchaseOrderLine';

export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export class PurchaseOrder {
  constructor(
    readonly orderNumber: string,
    readonly supplierCode: string,
    readonly supplierName: string,
    readonly expectedDate: string,
    readonly lines: readonly PurchaseOrderLine[],
  ) {}

  get status(): OrderStatus {
    const s = this.lines.map(lineStatus);
    if (s.every((x) => x === 'pending')) return 'pending';
    return s.some((x) => x === 'pending') ? 'in_progress' : 'completed';
  }
}
