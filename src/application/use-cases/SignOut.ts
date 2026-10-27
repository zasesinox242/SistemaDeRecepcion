import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class SignOut {
  constructor(private readonly auth: AuthRepository) {}

  execute(): Promise<void> {
    return this.auth.signOut();
  }
}
