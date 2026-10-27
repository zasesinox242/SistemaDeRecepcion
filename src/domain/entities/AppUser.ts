export type UserRole = 'supervisor' | 'receptionist';

export interface AppUser {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
}
