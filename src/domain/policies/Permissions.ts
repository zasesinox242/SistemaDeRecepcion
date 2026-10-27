import { AppUser, UserRole } from '../entities/AppUser';

export type Permission = 'import_plan' | 'view_dashboard' | 'export_report' | 'record_reception';

const PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  supervisor: ['import_plan', 'view_dashboard', 'export_report', 'record_reception'],
  receptionist: ['record_reception'],
};

export const can = (user: AppUser, permission: Permission): boolean =>
  PERMISSIONS[user.role].includes(permission);
