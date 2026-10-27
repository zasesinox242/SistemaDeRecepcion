import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AppUser } from '../../domain/entities/AppUser';
import { container } from '../../main/container';

interface AuthValue {
  user: AppUser | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const Ctx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      container.observeSession.execute((u) => {
        setUser(u);
        setLoading(false);
      }),
    [],
  );

  const value: AuthValue = {
    user,
    loading,
    signIn: async (email, password) => {
      setUser(await container.signIn.execute(email, password));
    },
    signOut: () => container.signOut.execute(),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return v;
}
