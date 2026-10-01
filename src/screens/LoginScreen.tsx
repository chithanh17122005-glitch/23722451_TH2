import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '@constants/theme';
import { STUDENT, VARIANT } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const LoginScreen: React.FC = () => {
  const isPhone = VARIANT.authField === 'phone';
  const defaultVal = isPhone ? `0987654321` : `student.${STUDENT.mssv}@iuh.edu.vn`;
  const [inputValue, setInputValue] = useState(defaultVal);

  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login(inputValue || defaultVal);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {VARIANT.watermarkAtTop && <Watermark position="top" />}
        <View style={styles.content}>
          <Text style={styles.appTitle}>KTXGO</Text>
          <Text style={styles.subTitle}>Giao đồ tận phòng ký túc xá</Text>

          <View style={styles.inputCard}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>
                {isPhone ? 'Phone' : 'Email'} — {STUDENT.mssv}
              </Text>
              <Text style={styles.variantBadge}>(A)</Text>
            </View>

            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={isPhone ? 'Nhập số điện thoại...' : 'Nhập địa chỉ email...'}
              placeholderTextColor={theme.textLight}
              keyboardType={isPhone ? 'phone-pad' : 'email-address'}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>Vào cửa hàng</Text>
            </TouchableOpacity>

            <Text style={styles.authInfo}>Auth Stack · chưa có token</Text>
          </View>
        </View>

        {!VARIANT.watermarkAtTop && <Watermark position="bottom" />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: theme.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: theme.textLight,
    marginBottom: 32,
  },
  inputCard: {
    width: '100%',
    backgroundColor: theme.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textLight,
  },
  variantBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.primary,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: theme.text,
    backgroundColor: '#F8FAFC',
    marginBottom: 16,
  },
  loginButton: {
    height: 48,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  authInfo: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
    color: theme.textLight,
  },
});
