import { AppUser } from '../../domain/entities/AppUser';
import { AuthError } from '../../domain/errors/DomainErrors';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class SignIn {
  constructor(private readonly auth: AuthRepository) {}

  execute(email: string, password: string): Promise<AppUser> {
    if (email.trim() === '' || password === '') throw new AuthError('Ingresa tu correo y contraseña.');
    return this.auth.signIn(email, password);
  }
}
