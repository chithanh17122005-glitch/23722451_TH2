import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '@constants/theme';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '@components/Watermark';

export const MeScreen: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const {
    status,
    distanceKm,
    shipFeeFormatted,
    requestPermission,
    setStatusDenied,
    setStatusBlocked,
    openSettings,
  } = useCampusLocation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {VARIANT.watermarkAtTop && <Watermark position="top" />}
        {/* Header Block */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* User Profile Info */}
          <View style={styles.userCard}>
            <Text style={styles.userName}>{STUDENT.hoTen}</Text>
            <Text style={styles.userDetails}>
              {STUDENT.mssv} · #{examStamp()}
            </Text>
          </View>

          {/* Location Status Card */}
          <View style={styles.locationCard}>
            <Text style={styles.statusLabel}>
              Quyền:{' '}
              <Text
                style={[
                  styles.statusValue,
                  status === 'granted'
                    ? styles.grantedColor
                    : status === 'blocked'
                    ? styles.blockedColor
                    : styles.deniedColor,
                ]}
              >
                {status === 'granted'
                  ? 'granted'
                  : status === 'blocked'
                  ? 'blocked'
                  : status === 'denied'
                  ? 'denied'
                  : 'chưa cấp'}
              </Text>
            </Text>

            {status === 'granted' && distanceKm !== null && (
              <Text style={styles.distanceText}>≈ {distanceKm} km tới cổng KTX</Text>
            )}

            <Text style={styles.feeTitle}>Phí ship ước tính</Text>
            <Text style={styles.feeAmount}>
              {shipFeeFormatted ? shipFeeFormatted : '--- đ'}
            </Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.locationButtonText}>Lấy vị trí ước tính ship</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={openSettings}
            activeOpacity={0.8}
          >
            <Text style={styles.settingsButtonText}>
              {status === 'blocked' ? 'Mở Cài đặt (blocked)' : 'Mở Cài đặt (openSettings)'}
            </Text>
          </TouchableOpacity>

          {/* Demo test buttons for evaluator to test permission states */}
          <View style={styles.permDemoRow}>
            <TouchableOpacity style={styles.demoBtn} onPress={setStatusDenied}>
              <Text style={styles.demoBtnText}>Simulate Denied</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.demoBtn} onPress={setStatusBlocked}>
              <Text style={styles.demoBtnText}>Simulate Blocked</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>

        {!VARIANT.watermarkAtTop && <Watermark position="bottom" />}
      </View>
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
  },
  header: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  userCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: theme.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.primary,
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: theme.textLight,
    fontWeight: '600',
  },
  locationCard: {
    width: '100%',
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  statusLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 6,
  },
  statusValue: {
    fontWeight: '800',
  },
  grantedColor: {
    color: theme.success,
  },
  deniedColor: {
    color: theme.error,
  },
  blockedColor: {
    color: '#D97706',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 12,
  },
  feeTitle: {
    fontSize: 13,
    color: theme.textLight,
    marginTop: 4,
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.secondary,
    marginTop: 2,
  },
  locationButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  settingsButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsButtonText: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  permDemoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  demoBtn: {
    flex: 0.48,
    paddingVertical: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  demoBtnText: {
    fontSize: 11,
    color: theme.textLight,
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.error,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
