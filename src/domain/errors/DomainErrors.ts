export class InvalidQuantityError extends Error {
  constructor(value: unknown) {
    super(`Cantidad inválida: ${String(value)}. Debe ser un entero mayor o igual a 0.`);
  }
}
