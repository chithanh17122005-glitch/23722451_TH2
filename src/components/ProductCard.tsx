import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Product } from '@services/productApi';
import { theme } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import { STUDENT, VARIANT } from '@constants/student';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const addToCart = useCartStore((state) => state.add);

  const handleAdd = () => {
    addToCart(product);

    // Haptic feedback based on VARIANT.hapticOnAdd
    if (VARIANT.hapticOnAdd === 'impact') {
      Vibration.vibrate([0, 40, 20, 40]);
    } else {
      // 'selection'
      Vibration.vibrate(20);
    }

    Alert.alert(
      `TH2 [${STUDENT.mssv}]`,
      `Đã thêm "${product.title}" vào giỏ hàng!\n(Haptic: ${VARIANT.hapticOnAdd})`
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(product)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.price}>{product.formattedPrice}</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: theme.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  imageContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#BFDBFE',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    marginTop: 8,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.primary,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
