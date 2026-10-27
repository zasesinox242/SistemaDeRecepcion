import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { theme } from '../theme';

export default function AccountButton() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) return null;
  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <Pressable style={styles.avatar} onPress={() => setOpen(true)}>
        <Text style={styles.avatarText}>{initials}</Text>
      </Pressable>
      <Modal transparent animationType="slide" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>{user.role === 'supervisor' ? 'Supervisor' : 'Personal de recepción'}</Text>
            <Pressable
              style={styles.btn}
              onPress={() => {
                setOpen(false);
                signOut();
              }}
            >
              <Text style={styles.btnText}>Cerrar sesión</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  overlay: { flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 22, paddingBottom: 36 },
  name: { fontSize: 20, fontWeight: '700', color: theme.text },
  email: { color: theme.muted, marginTop: 2 },
  role: { color: theme.navy, fontWeight: '600', marginTop: 10, marginBottom: 6 },
  btn: { backgroundColor: theme.navy, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
