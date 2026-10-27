# PB23 · Modelo de datos

Va encima de PB22 y PB01. Acepta reemplazar `container.ts` y `HomeScreen.tsx`. Copia también la carpeta `docs/`.

## Qué trae
- `domain/entities`: usuario, orden de compra y producto de la orden, con la regla de estados.
- `infrastructure/firebase`: nombres de colecciones, conversor de datos y repositorio de Firestore.
- `docs/modelo-de-datos.md`: diagrama relacional y cómo se implementa en Firestore (GitHub dibuja el diagrama solo).

## Cómo probarlo
1. `npx expo start -c`
2. En la app, pulsa **Cargar datos de ejemplo**. Debe listar 2 órdenes: una "En proceso" y una "Pendiente".
3. En la consola de Firebase, en Firestore, revisa `receptionDays > (fecha de hoy) > purchaseOrders`. La colección `users` aparece cuando crees usuarios en PB02 y PB03.
4. `node scripts/check-architecture.js`

Los datos de ejemplo se pueden borrar desde la consola.

## Criterios de PB23
- [ ] Existen las colecciones de usuarios, días de recepción, órdenes de compra y productos.
- [ ] Cada producto guarda cantidad ordenada y recibida (vacía si está pendiente).
- [ ] Cada producto guarda el usuario y la hora de su recepción.
- [ ] El modelo está documentado con un diagrama.

## Subtareas sugeridas para Jira (PB23)
1. Definir las entidades en TypeScript
2. Diseñar la estructura de colecciones en Firestore
3. Documentar el modelo con el diagrama
4. Probar guardar y leer datos de ejemplo

Estimación sugerida: 3 puntos.
