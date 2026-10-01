import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { useAuthStore } from '@stores/authStore';
import { theme } from '@constants/theme';

export const RootNavigator: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <View style={styles.container}>
      {token ? <MainTabs /> : <AuthStack />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});
