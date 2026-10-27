import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/presentation/auth/AuthContext';
import MainTabs from './src/presentation/navigation/MainTabs';
import LoginScreen from './src/presentation/screens/LoginScreen';
import { theme } from './src/presentation/theme';

function Root() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.navy, justifyContent: 'center' }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
  if (!user) return <LoginScreen />;
  return (
    <NavigationContainer key={user.uid}>
      <MainTabs user={user} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
