import { InvalidQuantityError } from '../../domain/errors/DomainErrors';
import { ReceivedQuantity } from '../../domain/value-objects/ReceivedQuantity';

export interface QuantityResult {
  ok: boolean;
  message: string;
}

export class ParseReceivedQuantity {
  execute(raw: string): QuantityResult {
    const text = raw.trim();
    if (text === '') return { ok: true, message: 'Pendiente (sin cantidad registrada)' };
    try {
      const qty = ReceivedQuantity.create(Number(text));
      return { ok: true, message: qty.value === 0 ? 'No llegó (0)' : `Recibido: ${qty.value}` };
    } catch (e) {
      if (e instanceof InvalidQuantityError) {
        return { ok: false, message: `Cantidad inválida: "${text}". Debe ser un entero mayor o igual a 0.` };
      }
      throw e;
    }
  }
}
