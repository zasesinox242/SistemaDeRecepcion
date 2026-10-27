import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ConnectionCheck, ConnectionResult } from '../../domain/ports/ConnectionCheck';
import { db } from './firebaseApp';

export class FirestoreConnectionCheck implements ConnectionCheck {
  async ping(): Promise<ConnectionResult> {
    try {
      const ref = doc(db, '_healthcheck', 'ping');
      await setDoc(ref, { at: serverTimestamp(), by: 'RecepTrack' });
      const snap = await getDoc(ref);
      return snap.exists()
        ? { ok: true, detail: 'Conexión OK: se escribió y se leyó un documento de prueba.' }
        : { ok: false, detail: 'No se encontró el documento de prueba.' };
    } catch (e) {
      return { ok: false, detail: e instanceof Error ? e.message : 'Error desconocido' };
    }
  }
}
