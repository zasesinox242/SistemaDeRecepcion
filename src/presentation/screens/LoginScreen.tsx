import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../auth/AuthContext';
import { theme } from '../theme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.screen} keyboardShouldPersistTaps="handled">
      <StatusBar style="light" />
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>R</Text>
        </View>
        <Text style={styles.title}>RecepTrack</Text>
        <Text style={styles.sub}>Control de recepción de mercadería</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="correo@empresa.pe"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <Pressable style={[styles.btn, busy && styles.btnOff]} onPress={submit} disabled={busy}>
          <Text style={styles.btnText}>{busy ? 'Ingresando...' : 'Ingresar'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  hero: { backgroundColor: theme.navy, alignItems: 'center', paddingTop: 90, paddingBottom: 44 },
  logo: { width: 64, height: 64, borderRadius: 18, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginTop: 12 },
  sub: { color: '#cdd8ee', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, margin: 16, marginTop: -20 },
  label: { color: theme.muted, fontWeight: '600', fontSize: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#d5dbe7', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 14 },
  error: { color: '#b42327', backgroundColor: '#fde0e0', borderRadius: 8, padding: 10, marginBottom: 12 },
  btn: { backgroundColor: theme.navy, borderRadius: 12, padding: 14, alignItems: 'center' },
  btnOff: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
