import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/presentation/auth/AuthContext';
import LoginScreen from './src/presentation/screens/LoginScreen';
import SessionScreen from './src/presentation/screens/SessionScreen';
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
  return user ? <SessionScreen /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
