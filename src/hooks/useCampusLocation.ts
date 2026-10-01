import { useState } from 'react';
import { Linking, Alert } from 'react-native';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';

// Fixed KTX Campus Gate Location: 10.8804, 106.8054
const KTX_LAT = 10.8804;
const KTX_LNG = 106.8054;

// Mock user current position: 10.8700, 106.8000 (~1.2 km away)
const MOCK_USER_LAT = 10.8700;
const MOCK_USER_LNG = 106.8000;

export type LocationPermissionStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'blocked';

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useCampusLocation() {
  const [status, setStatus] = useState<LocationPermissionStatus>('idle');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [shipFee, setShipFee] = useState<number | null>(null);

  const calculateShipFee = (km: number): number => {
    if (VARIANT.shipFormula === 'A') {
      return BASE_SHIP_FEE + Math.round(km * 2000);
    } else {
      // Formula B: BASE_SHIP_FEE + Math.round(km * 1500) + 2000
      return BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
    }
  };

  const requestPermission = () => {
    setStatus('requesting');
    setTimeout(() => {
      // Grant permission and calculate distance + ship fee
      const dist = haversineDistance(MOCK_USER_LAT, MOCK_USER_LNG, KTX_LAT, KTX_LNG);
      const roundedDist = Math.round(dist * 10) / 10; // ~1.2 km
      const fee = calculateShipFee(roundedDist);

      setStatus('granted');
      setDistanceKm(roundedDist);
      setShipFee(fee);
    }, 600);
  };

  const setStatusDenied = () => {
    setStatus('denied');
    setDistanceKm(null);
    setShipFee(null);
  };

  const setStatusBlocked = () => {
    setStatus('blocked');
    setDistanceKm(null);
    setShipFee(null);
  };

  const openSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Thông báo', 'Không thể mở Cài đặt ứng dụng.');
    });
  };

  return {
    status,
    distanceKm,
    shipFee,
    shipFeeFormatted: shipFee !== null ? `${shipFee.toLocaleString('vi-VN')} đ` : null,
    formulaUsed: VARIANT.shipFormula,
    requestPermission,
    setStatusDenied,
    setStatusBlocked,
    openSettings,
  };
}
