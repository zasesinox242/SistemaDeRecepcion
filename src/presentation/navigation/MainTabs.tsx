import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { AppUser } from '../../domain/entities/AppUser';
import { can } from '../../domain/policies/Permissions';
import AccountButton from '../components/AccountButton';
import { DashboardScreen, ExportScreen, ImportScreen, ReceptionScreen } from '../screens/ModuleScreens';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const icon = (e: string) => () => <Text style={{ fontSize: 20 }}>{e}</Text>;

export default function MainTabs({ user }: { user: AppUser }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.navy },
        headerTintColor: '#fff',
        headerRight: () => <AccountButton />,
        tabBarActiveTintColor: theme.navy,
      }}
    >
      <Tab.Screen name="Recepción" component={ReceptionScreen} options={{ tabBarIcon: icon('📦') }} />
      {can(user, 'view_dashboard') ? (
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: icon('📊') }} />
      ) : null}
      {can(user, 'import_plan') ? (
        <Tab.Screen name="Importar" component={ImportScreen} options={{ tabBarIcon: icon('⬆️') }} />
      ) : null}
      {can(user, 'export_report') ? (
        <Tab.Screen name="Exportar" component={ExportScreen} options={{ tabBarIcon: icon('⬇️') }} />
      ) : null}
    </Tab.Navigator>
  );
}
