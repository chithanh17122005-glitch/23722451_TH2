import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '@constants/theme';
import { STUDENT, ROOM_LABEL, STALE_TIME_MS, DEBOUNCE_MS, VARIANT } from '@constants/student';
import { fetchProducts, Product } from '@services/productApi';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebouncedValue(searchText, DEBOUNCE_MS);

  // Simulated error mode toggle for testing Network Error state (Requirement Page 6)
  const [simulateError, setSimulateError] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  const filteredProducts = (products || []).filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleCardPress = (product: Product) => {
    navigation.navigate('Detail', { id: product.id, product });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={handleCardPress} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {VARIANT.watermarkAtTop && <Watermark position="top" />}
        {/* Header Block (A) */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.appTitle}>KTXGO</Text>
            <TouchableOpacity
              style={styles.simulateErrorBtn}
              onPress={() => setSimulateError(!simulateError)}
            >
              <Text style={styles.simulateErrorText}>
                {simulateError ? 'Tắt lỗi mạng' : 'Giả lập lỗi mạng'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.roomLabel}>Giao tận {ROOM_LABEL}</Text>
        </View>

        {/* Search Block (B) */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
              placeholderTextColor={theme.textLight}
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.flashListBadge}>(C) FlashList ×2</Text>
        </View>

        {/* 3 Network States (Cảnh mạng: Loading, Error, Data) */}
        {simulateError || isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
            <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setSimulateError(false);
                refetch();
              }}
            >
              <Text style={styles.retryButtonText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Đang tải món...</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlashList
              data={filteredProducts}
              renderItem={renderItem}
              numColumns={2}
              {...({ estimatedItemSize: 180 } as any)}
              keyExtractor={(item: Product) => `${STUDENT.mssv}-${item.id}`}
              contentContainerStyle={styles.listContent}
              refreshControl={
                <RefreshControl refreshing={isRefetching} onRefresh={() => { refetch(); }} colors={[theme.primary]} />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Không tìm thấy món ăn nào!</Text>
                </View>
              }
            />
          </View>
        )}

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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: theme.primary,
    letterSpacing: 1,
  },
  simulateErrorBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
  },
  simulateErrorText: {
    fontSize: 10,
    color: theme.textLight,
    fontWeight: '600',
  },
  roomLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textLight,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  searchBar: {
    backgroundColor: theme.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 14,
    color: theme.text,
  },
  flashListBadge: {
    alignSelf: 'flex-end',
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.primary,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.textLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorMssv: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.error,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 14,
    color: theme.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: theme.error,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: theme.textLight,
  },
});
