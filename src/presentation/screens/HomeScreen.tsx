import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { container } from '../../main/container';
import { theme } from '../theme';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const result = container.parseQuantity.execute(text);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Text style={styles.title}>RecepTrack</Text>
      <Text style={styles.sub}>Sprint 1 · PB22 · Clean Architecture</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.navy, padding: 24, paddingTop: 90 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700' },
  sub: { color: '#cdd8ee', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 28 },
  label: { color: theme.muted, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#d5dbe7', borderRadius: 10, padding: 12, fontSize: 18 },
  result: { marginTop: 12, fontSize: 16, color: theme.ok, fontWeight: '600' },
  error: { color: theme.bad },
});
