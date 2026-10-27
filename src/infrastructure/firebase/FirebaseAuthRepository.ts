import { FirebaseError } from 'firebase/app';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AppUser } from '../../domain/entities/AppUser';
import { AuthError } from '../../domain/errors/DomainErrors';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { auth, db } from './firebaseApp';
import { paths } from './paths';

const FALLBACK = 'No se pudo iniciar sesión. Inténtalo de nuevo.';
const NO_ROLE = 'Tu usuario no tiene un rol asignado. Contacta al supervisor.';
const MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'Correo o contraseña incorrectos.',
  'auth/invalid-email': 'El correo no es válido.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
};

export class FirebaseAuthRepository implements AuthRepository {
  private async toUser(u: User): Promise<AppUser> {
    let data: Record<string, any>;
    try {
      const snap = await getDoc(doc(db, paths.users, u.uid));
      if (!snap.exists()) throw new AuthError(NO_ROLE);
      data = snap.data();
    } catch (e) {
      if (e instanceof AuthError) throw e;
      throw new AuthError('No se pudo verificar tu rol. Revisa tu conexión e inténtalo de nuevo.');
    }
    if (data.role !== 'supervisor' && data.role !== 'receptionist') throw new AuthError(NO_ROLE);
    return { uid: u.uid, email: u.email ?? '', name: data.name ?? u.email ?? 'Usuario', role: data.role };
  }

  async signIn(email: string, password: string): Promise<AppUser> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      return await this.toUser(cred.user);
    } catch (e) {
      if (e instanceof AuthError) {
        await fbSignOut(auth);
        throw e;
      }
      throw new AuthError(e instanceof FirebaseError ? MESSAGES[e.code] ?? FALLBACK : FALLBACK);
    }
  }

  signOut(): Promise<void> {
    return fbSignOut(auth);
  }

  observeUser(onChange: (user: AppUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) return onChange(null);
      try {
        onChange(await this.toUser(u));
      } catch {
        await fbSignOut(auth);
        onChange(null);
      }
    });
  }
}
