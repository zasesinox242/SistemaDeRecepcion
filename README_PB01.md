# PB01 · Configuración de Firebase

Va encima del proyecto de PB22 (misma carpeta `recepcion`). Acepta reemplazar `container.ts`, `HomeScreen.tsx` y `check-architecture.js`.

## En la consola de Firebase (console.firebase.google.com)
(Los nombres de los menús pueden variar un poco.)
1. **Crear un proyecto**: nombre `RecepTrack`. Puedes desactivar Google Analytics.
2. **Compilación > Authentication > Comenzar > Método de acceso**: habilita **Correo electrónico/contraseña** y guarda.
3. **Compilación > Firestore Database > Crear base de datos**: elige una ubicación (por ejemplo `southamerica-east1`) y el **modo de prueba** (es temporal; las reglas reales se hacen en PB03).
4. **Configuración del proyecto (engranaje) > Tus apps > icono web `</>`**: registra una app web llamada `RecepTrack` y copia los valores de `firebaseConfig`.

## En tu proyecto
1. Copia `.env.example` a `.env` y pega cada valor (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
2. Abre `.gitignore` y agrega una línea con `.env`, para que las claves no se suban al repositorio.
3. Instala: `npx expo install firebase @react-native-async-storage/async-storage`
4. Inicia limpiando caché: `npx expo start -c`
5. En la app, pulsa **Probar conexión**. Debe decir "Conexión OK" y en Firestore aparecerá la colección `_healthcheck`.
6. Verifica: `node scripts/check-architecture.js`

Si falta una clave, la app se detiene con un mensaje que dice cuál es. Si el editor marca `process` en rojo, no afecta la ejecución.

## Criterios de PB01
- [ ] Proyecto de Firebase creado y vinculado a la app.
- [ ] Authentication con correo y contraseña habilitado.
- [ ] Firestore creado, y la app escribe y lee en el entorno de prueba.
- [ ] Las credenciales están en `.env`, fuera del repositorio.

## Subtareas sugeridas para Jira (PB01)
1. Crear el proyecto en Firebase
2. Habilitar Authentication (correo y contraseña)
3. Crear Firestore en modo de prueba
4. Configurar `.env` y probar la conexión

Estimación sugerida: 3 puntos.
