import { AppUser } from '../../domain/entities/AppUser';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class ObserveSession {
  constructor(private readonly auth: AuthRepository) {}

  execute(onChange: (user: AppUser | null) => void): () => void {
    return this.auth.observeUser(onChange);
  }
}
