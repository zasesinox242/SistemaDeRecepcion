# Roles y seguridad · RecepTrack

## Permisos por rol
| Acción | Supervisor | Personal de recepción |
|---|---|---|
| Iniciar sesión y ver la recepción del día | Sí | Sí |
| Registrar cantidades recibidas | Sí | Sí |
| Importar la programación (crear o eliminar órdenes) | Sí | No |
| Ver el dashboard | Sí | No |
| Exportar el reporte de cierre | Sí | No |

## Cómo funciona
1. Cada usuario tiene un documento `users/{uid}` con su `role` (`supervisor` o `receptionist`).
2. Al iniciar sesión, la app lee ese rol. Si el documento no existe o el rol no es válido, no entra.
3. Los roles se asignan desde la consola de Firebase. Las reglas no permiten escribir en `users`, así que nadie puede cambiar su propio rol desde la app.
4. Las reglas de `firestore.rules` son la protección real: aunque alguien salte la interfaz, la base de datos rechaza lo que su rol no permite.

## Límite del modelo actual
Las cantidades viven dentro del campo `lines` de cada orden. Las reglas permiten al personal actualizar `lines`, pero no pueden revisar qué campo de cada línea se tocó. Si se quisiera cerrar ese hueco, las recepciones se guardarían en una subcolección aparte.
