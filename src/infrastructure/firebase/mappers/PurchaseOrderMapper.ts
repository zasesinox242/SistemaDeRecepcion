import { DocumentData, Timestamp } from 'firebase/firestore';
import { PurchaseOrder } from '../../../domain/entities/PurchaseOrder';
import { PurchaseOrderLine } from '../../../domain/entities/PurchaseOrderLine';

export const PurchaseOrderMapper = {
  toDomain(orderNumber: string, data: DocumentData): PurchaseOrder {
    const lines: PurchaseOrderLine[] = Object.entries<any>(data.lines ?? {})
      .map(([id, l]) => ({
        id,
        productCode: l.productCode,
        ean: l.ean,
        description: l.description,
        orderedQty: l.orderedQty,
        receivedQty: l.receivedQty ?? null,
        receivedBy: l.receivedBy ?? null,
        receivedAt: l.receivedAt instanceof Timestamp ? l.receivedAt.toDate() : null,
      }))
      .sort((a, b) => a.productCode.localeCompare(b.productCode));
    return new PurchaseOrder(orderNumber, data.supplierCode, data.supplierName, data.expectedDate, lines);
  },

  toFirestore(o: PurchaseOrder): DocumentData {
    return {
      supplierCode: o.supplierCode,
      supplierName: o.supplierName,
      expectedDate: o.expectedDate,
      lines: Object.fromEntries(
        o.lines.map((l) => [
          l.id,
          {
            productCode: l.productCode,
            ean: l.ean,
            description: l.description,
            orderedQty: l.orderedQty,
            receivedQty: l.receivedQty,
            receivedBy: l.receivedBy,
            receivedAt: l.receivedAt ? Timestamp.fromDate(l.receivedAt) : null,
          },
        ]),
      ),
    };
  },
};
