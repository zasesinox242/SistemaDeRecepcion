import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { container } from '../../main/container';
import { theme } from '../theme';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [conn, setConn] = useState<{ ok: boolean; detail: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const result = container.parseQuantity.execute(text);

  const testConnection = async () => {
    setLoading(true);
    setConn(await container.checkConnection.execute());
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Text style={styles.title}>RecepTrack</Text>
      <Text style={styles.sub}>Sprint 1 · PB22 y PB01</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Prueba la regla de cantidad</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          keyboardType="numeric"
          placeholder="Ej.: 0, 25, -3, 2.5"
        />
        <Text style={[styles.result, !result.ok && styles.error]}>{result.message}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Conexión con Firebase</Text>
        <Pressable style={styles.btn} onPress={testConnection} disabled={loading}>
          <Text style={styles.btnText}>{loading ? 'Probando...' : 'Probar conexión'}</Text>
        </Pressable>
        {conn && <Text style={[styles.result, !conn.ok && styles.error]}>{conn.detail}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.navy, padding: 24, paddingTop: 90 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700' },
  sub: { color: '#cdd8ee', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 20 },
  label: { color: theme.muted, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#d5dbe7', borderRadius: 10, padding: 12, fontSize: 18 },
  result: { marginTop: 12, fontSize: 15, color: theme.ok, fontWeight: '600' },
  error: { color: theme.bad },
  btn: { backgroundColor: theme.navy, borderRadius: 12, padding: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
