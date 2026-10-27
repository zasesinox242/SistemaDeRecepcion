import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PurchaseOrder } from '../../domain/entities/PurchaseOrder';
import { container } from '../../main/container';
import { theme } from '../theme';

const STATUS = { pending: 'Pendiente', in_progress: 'En proceso', completed: 'Completada' };

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [conn, setConn] = useState<{ ok: boolean; detail: string } | null>(null);
  const [orders, setOrders] = useState<PurchaseOrder[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const result = container.parseQuantity.execute(text);

  const run = async (name: string, fn: () => Promise<void>) => {
    setBusy(name);
    setError('');
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    }
    setBusy('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <Text style={styles.title}>RecepTrack</Text>
      <Text style={styles.sub}>Sprint 1 · PB22, PB01 y PB23</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Regla de cantidad</Text>
        <TextInput style={styles.input} value={text} onChangeText={setText} keyboardType="numeric" placeholder="Ej.: 0, 25, -3, 2.5" />
        <Text style={[styles.result, !result.ok && styles.error]}>{result.message}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Conexión con Firebase</Text>
        <Pressable style={styles.btn} onPress={() => run('conn', async () => setConn(await container.checkConnection.execute()))}>
          <Text style={styles.btnText}>{busy === 'conn' ? 'Probando...' : 'Probar conexión'}</Text>
        </Pressable>
        {conn && <Text style={[styles.result, !conn.ok && styles.error]}>{conn.detail}</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Modelo de datos (guardar y leer)</Text>
        <Pressable
          style={styles.btn}
          onPress={() => run('demo', async () => setOrders(await container.demoDay.execute(new Date().toISOString().slice(0, 10))))}
        >
          <Text style={styles.btnText}>{busy === 'demo' ? 'Guardando...' : 'Cargar datos de ejemplo'}</Text>
        </Pressable>
        {orders?.map((o) => (
          <Text key={o.orderNumber} style={styles.line}>
            {o.supplierName} · OC {o.orderNumber} · {o.lines.length} productos · {STATUS[o.status]}
          </Text>
        ))}
        {error !== '' && <Text style={[styles.result, styles.error]}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.navy },
  content: { padding: 24, paddingTop: 90, paddingBottom: 40 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700' },
  sub: { color: '#cdd8ee', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 20 },
  label: { color: theme.muted, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#d5dbe7', borderRadius: 10, padding: 12, fontSize: 18 },
  result: { marginTop: 12, fontSize: 15, color: theme.ok, fontWeight: '600' },
  error: { color: theme.bad },
  btn: { backgroundColor: theme.navy, borderRadius: 12, padding: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  line: { marginTop: 10, color: theme.text, fontSize: 14 },
});
