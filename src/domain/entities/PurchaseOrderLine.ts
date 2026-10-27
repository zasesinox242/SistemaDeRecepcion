export type LineStatus = 'pending' | 'missing' | 'partial' | 'complete' | 'over';

export interface PurchaseOrderLine {
  readonly id: string;
  readonly productCode: string;
  readonly ean: string;
  readonly description: string;
  readonly orderedQty: number;
  readonly receivedQty: number | null;
  readonly receivedBy: string | null;
  readonly receivedAt: Date | null;
}

export function lineStatus(line: PurchaseOrderLine): LineStatus {
  if (line.receivedQty === null) return 'pending';
  if (line.receivedQty === 0) return 'missing';
  if (line.receivedQty < line.orderedQty) return 'partial';
  if (line.receivedQty > line.orderedQty) return 'over';
  return 'complete';
}
