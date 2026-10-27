import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import HomeScreen from './HomeScreen';

function Module({ title, text, task, children }: { title: string; text: string; task: string; children?: React.ReactNode }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.task}>{task}</Text>
        {children}
      </View>
    </View>
  );
}

export function ReceptionScreen() {
  const [tech, setTech] = useState(false);
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
    <Module title="Recepción del día" text="Aquí irá la lista de proveedores y órdenes de compra." task="Se construye en PB08 y PB09">
      <Pressable style={styles.btn} onPress={() => setTech(true)}>
        <Text style={styles.btnText}>Ver pruebas técnicas (PB22 a PB23)</Text>
      </Pressable>
    </Module>
  );
}

export const DashboardScreen = () => (
  <Module title="Dashboard en tiempo real" text="Indicadores de avance, faltantes y proveedores del día." task="Se construye en PB16 y PB17" />
);
export const ImportScreen = () => (
  <Module title="Importar programación" text="Carga del Excel con lo que debe recibirse en el día." task="Se construye en PB05 a PB07" />
);
export const ExportScreen = () => (
  <Module title="Exportar reporte" text="Reporte de cierre en Excel para entregar a inventario." task="Se construye en PB19 y PB20" />
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  title: { fontSize: 20, fontWeight: '700', color: theme.text },
  text: { color: theme.text, marginTop: 8 },
  task: { color: theme.muted, marginTop: 8, fontSize: 13 },
  btn: { backgroundColor: '#e8ecf3', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  btnText: { color: theme.navy, fontWeight: '600' },
  back: { position: 'absolute', top: 16, left: 16, backgroundColor: '#ffffff30', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 },
  backText: { color: '#fff', fontWeight: '600' },
});
