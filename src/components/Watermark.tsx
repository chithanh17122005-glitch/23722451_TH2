import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';

interface WatermarkProps {
  // Optional override if explicit placement needed, defaults to VARIANT.watermarkAtTop
  position?: 'top' | 'bottom';
}

export const Watermark: React.FC<WatermarkProps> = ({ position }) => {
  const isTop = position ? position === 'top' : VARIANT.watermarkAtTop;
  const stamp = examStamp();
  const textContent = `TH2 · ${STUDENT.mssv} · ${STUDENT.hoTen} · #${stamp}`;

  return (
    <View style={[styles.container, isTop ? styles.topStyle : styles.bottomStyle]}>
      <Text style={styles.text}>{textContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#DBEAFE', // Soft background highlight
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.border,
    zIndex: 99,
  },
  topStyle: {
    borderTopWidth: 0,
  },
  bottomStyle: {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.primary,
    letterSpacing: 0.5,
  },
});
