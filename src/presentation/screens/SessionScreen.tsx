import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../auth/AuthContext';
import { theme } from '../theme';
import HomeScreen from './HomeScreen';

export default function SessionScreen() {
  const { user, signOut } = useAuth();
  const [tech, setTech] = useState(false);
  if (!user) return null;

  if (tech) {
    return (
      <View style={{ flex: 1 }}>
        <HomeScreen />
        <Pressable style={styles.back} onPress={() => setTech(false)}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Text style={styles.title}>Hola, {user.name}</Text>
      <Text style={styles.sub}>{user.email}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Rol</Text>
        <Text style={styles.role}>{user.role === 'supervisor' ? 'Supervisor' : 'Personal de recepción'}</Text>
        <Pressable style={[styles.btn, styles.btnSec]} onPress={() => setTech(true)}>
          <Text style={styles.btnSecText}>Ver pruebas técnicas (PB22 a PB23)</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => signOut()}>
          <Text style={styles.btnText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.navy, padding: 24, paddingTop: 100 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700' },
  sub: { color: '#cdd8ee', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginTop: 28 },
  label: { color: theme.muted, fontWeight: '600', fontSize: 12 },
  role: { color: theme.text, fontSize: 18, fontWeight: '700', marginTop: 2, marginBottom: 8 },
  btn: { backgroundColor: theme.navy, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  btnSec: { backgroundColor: '#e8ecf3' },
  btnSecText: { color: theme.navy, fontWeight: '600', fontSize: 15 },
  back: { position: 'absolute', top: 50, left: 16, backgroundColor: '#ffffff30', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 },
  backText: { color: '#fff', fontWeight: '600' },
});
