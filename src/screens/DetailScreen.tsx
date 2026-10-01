import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Vibration } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '@constants/theme';
import { STUDENT, VARIANT } from '@constants/student';
import { Product } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';

type DetailRouteParams = {
  Detail: {
    id: string;
    product?: Product;
  };
};

export const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<DetailRouteParams, 'Detail'>>();
  const navigation = useNavigation();

  const { id, product } = route.params || {};
  const addToCart = useCartStore((state) => state.add);

  // Fallback default product if direct route call
  const currentProduct: Product = product || {
    id: id || '1',
    originalId: Number(id) || 1,
    title: 'Cơm nắm rong biển',
    rawPrice: 15,
    price: 28500,
    formattedPrice: '28.500 đ',
    description: 'Cơm nắm dẻo thơm kết hợp rong biển sấy giòn. Món ăn nhanh đầy đủ dinh dưỡng cho sinh viên KTX.',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  };

  const handleAddToCart = () => {
    addToCart(currentProduct);

    if (VARIANT.hapticOnAdd === 'impact') {
      Vibration.vibrate([0, 40, 20, 40]);
    } else {
      Vibration.vibrate(20);
    }

    Alert.alert(
      `TH2 [${STUDENT.mssv}]`,
      `Đã thêm "${currentProduct.title}" vào giỏ hàng thành công!`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {VARIANT.watermarkAtTop && <Watermark position="top" />}
        {/* Navigation Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Chi tiết món</Text>
          </TouchableOpacity>
          <Text style={styles.stackLabel}>Stack</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Main Visual Image Card */}
          <View style={styles.imageCard}>
            <Image source={{ uri: currentProduct.image }} style={styles.image} resizeMode="cover" />
          </View>

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{currentProduct.title}</Text>
            <Text style={styles.price}>{currentProduct.formattedPrice}</Text>
            <Text style={styles.subText}>Giao nội khu · nhận tận phòng</Text>

            <View style={styles.divider} />

            <Text style={styles.descriptionLabel}>Mô tả chi tiết (id: {currentProduct.id}):</Text>
            <Text style={styles.description} numberOfLines={3}>
              {currentProduct.description}
            </Text>

            <TouchableOpacity style={styles.addCartButton} onPress={handleAddToCart} activeOpacity={0.8}>
              <Text style={styles.addCartButtonText}>Thêm vào giỏ · Haptic</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.surface,
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.primary,
  },
  stackLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.secondary,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  imageCard: {
    width: '100%',
    height: 200,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: theme.textLight,
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 12,
  },
  descriptionLabel: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600',
    color: theme.textLight,
    marginBottom: 4,
  },
  description: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
    marginBottom: 24,
  },
  addCartButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
