<<<<<<< HEAD
# RecepTrack · Sprint 1 · PB22

Estructura del proyecto React Native (Expo) con TypeScript y Clean Architecture.

## Pasos
1. Instala Node.js LTS (nodejs.org) y la app **Expo Go** en tu celular.
2. Crea el proyecto base:
   `npx create-expo-app@latest recepcion --template blank-typescript`
3. Entra a la carpeta: `cd recepcion`
4. Copia el contenido de este zip dentro de `recepcion` y acepta reemplazar `App.tsx`.
5. Ejecuta: `npx expo start` y escanea el QR con Expo Go. Debe verse la pantalla "RecepTrack".
6. Escribe en el cuadro: vacío = pendiente, 0 = no llegó, 25 = recibido, -3 o 2.5 = error.
7. Verifica la arquitectura: `node scripts/check-architecture.js`
8. Sube a un repositorio: `git init`, `git add .`, `git commit -m "PB22: estructura Clean Architecture"` y súbelo a GitHub.

## Capas (src/)
- `domain`: reglas de negocio puras. No importa Firebase, React ni Expo.
- `application`: casos de uso. Solo usa `domain`.
- `infrastructure`: aquí irá Firebase (PB01) y la lectura/exportación de Excel.
- `presentation`: pantallas y componentes de React Native.
- `main`: `container.ts` conecta todas las capas.

## Criterios de PB22
- [ ] El proyecto se ejecuta en un dispositivo o emulador.
- [ ] El código está organizado en domain, application, infrastructure y presentation.
- [ ] domain no importa Firebase ni React (lo comprueba el script).
- [ ] El proyecto está en un repositorio de control de versiones.

## Subtareas sugeridas para Jira (PB22)
1. Instalar Node.js y Expo Go
2. Crear el proyecto Expo con TypeScript
3. Crear la estructura de capas
4. Comprobar la regla de dependencias y subir el repositorio

Estimación sugerida: 3 puntos.
