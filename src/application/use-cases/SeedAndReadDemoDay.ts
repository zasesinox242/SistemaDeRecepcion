import { PurchaseOrder } from '../../domain/entities/PurchaseOrder';
import { PurchaseOrderLine } from '../../domain/entities/PurchaseOrderLine';
import { PurchaseOrderRepository } from '../../domain/repositories/PurchaseOrderRepository';

const line = (oc: string, code: string, desc: string, ordered: number, received: number | null): PurchaseOrderLine => ({
  id: `${oc}_${code}`,
  productCode: code,
  ean: `775${code.padStart(10, '0')}`,
  description: desc,
  orderedQty: ordered,
  receivedQty: received,
  receivedBy: received === null ? null : 'usuario-demo',
  receivedAt: received === null ? null : new Date(),
});

const sampleOrders = (date: string): PurchaseOrder[] => [
  new PurchaseOrder('4500011234', 'P-102', 'Textiles del Sur', date, [
    line('4500011234', '20502742', 'Polo algodón M', 120, 120),
    line('4500011234', '20502743', 'Polo algodón L', 100, 90),
    line('4500011234', '20502801', 'Casaca denim', 20, 0),
    line('4500011234', '20502815', 'Gorra lisa', 150, null),
  ]),
  new PurchaseOrder('4500011302', 'P-215', 'Comercial Norte', date, [
    line('4500011302', '30100011', 'Cuaderno A4', 200, null),
    line('4500011302', '30100012', 'Lapicero azul', 500, null),
  ]),
];

export class SeedAndReadDemoDay {
  constructor(private readonly repo: PurchaseOrderRepository) {}

  async execute(date: string): Promise<PurchaseOrder[]> {
    await this.repo.saveMany(date, sampleOrders(date));
    return this.repo.findByDate(date);
  }
}
