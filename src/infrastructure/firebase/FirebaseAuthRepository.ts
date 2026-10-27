import { FirebaseError } from 'firebase/app';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AppUser, UserRole } from '../../domain/entities/AppUser';
import { AuthError } from '../../domain/errors/DomainErrors';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { auth, db } from './firebaseApp';
import { paths } from './paths';

const FALLBACK = 'No se pudo iniciar sesión. Inténtalo de nuevo.';
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
    let data: Record<string, any> = {};
    try {
      const snap = await getDoc(doc(db, paths.users, u.uid));
      if (snap.exists()) data = snap.data();
    } catch {
      data = {};
    }
    const role: UserRole = data.role === 'supervisor' ? 'supervisor' : 'receptionist';
    return { uid: u.uid, email: u.email ?? '', name: data.name ?? u.email ?? 'Usuario', role };
  }

  async signIn(email: string, password: string): Promise<AppUser> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      return await this.toUser(cred.user);
    } catch (e) {
      throw new AuthError(e instanceof FirebaseError ? MESSAGES[e.code] ?? FALLBACK : FALLBACK);
    }
  }

  signOut(): Promise<void> {
    return fbSignOut(auth);
  }

  observeUser(onChange: (user: AppUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (u) => onChange(u ? await this.toUser(u) : null));
  }
}
