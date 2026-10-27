import { AppUser } from '../entities/AppUser';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<AppUser>;
  signOut(): Promise<void>;
  observeUser(onChange: (user: AppUser | null) => void): () => void;
}
