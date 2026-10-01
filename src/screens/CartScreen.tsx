import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { theme } from '@constants/theme';
import { ROOM_LABEL, VARIANT } from '@constants/student';
import { useCartStore, CartItem } from '@stores/cartStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '@components/Watermark';

export const CartScreen: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const changeQty = useCartStore((state) => state.changeQty);
  const remove = useCartStore((state) => state.remove);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const { shipFee, shipFeeFormatted } = useCampusLocation();

  const itemsTotal = totalAmount();
  const finalTotal = itemsTotal + (shipFee || 0);

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemTotal = item.product.price * item.quantity;
    return (
      <View style={styles.cartCard}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.product.title}</Text>
          <Text style={styles.itemQtyPrice}>
            ×{item.quantity}  {itemTotal.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => changeQty(item.product.id, -1)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyDisplay}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => changeQty(item.product.id, 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => remove(item.product.id)}
          >
            <Text style={styles.deleteBtnText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {VARIANT.watermarkAtTop && <Watermark position="top" />}
        {/* Screen Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
        </View>

        <View style={styles.content}>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống!</Text>
              <Text style={styles.emptySubText}>Hãy chọn món từ Cửa hàng để thêm vào giỏ.</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.product.id}
              contentContainerStyle={styles.listContent}
            />
          )}

          {/* Delivery & Total Box */}
          <View style={styles.summaryCard}>
            <Text style={styles.deliveryTitle}>Giao đến {ROOM_LABEL}</Text>

            <Text style={styles.shipFeeText}>
              Phí ship:{' '}
              {shipFeeFormatted ? (
                <Text style={styles.highlightText}>
                  {shipFeeFormatted} (công thức {VARIANT.shipFormula})
                </Text>
              ) : (
                <Text style={styles.subText}>
                  Vào tab Tôi để lấy vị trí ước tính ship ({VARIANT.shipFormula})
                </Text>
              )}
            </Text>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng hàng:</Text>
              <Text style={styles.totalValue}>{itemsTotal.toLocaleString('vi-VN')} đ</Text>
            </View>

            {shipFee !== null && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabelBold}>Tổng thanh toán:</Text>
                <Text style={styles.totalValueBold}>{finalTotal.toLocaleString('vi-VN')} đ</Text>
              </View>
            )}
          </View>
        </View>

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
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  cartCard: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  itemQtyPrice: {
    fontSize: 13,
    color: theme.textLight,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  qtyDisplay: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: -2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textLight,
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 13,
    color: theme.textLight,
  },
  summaryCard: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.secondary,
    padding: 16,
    marginTop: 8,
  },
  deliveryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.primary,
    marginBottom: 6,
  },
  shipFeeText: {
    fontSize: 13,
    color: theme.secondary,
    fontWeight: '600',
  },
  highlightText: {
    color: theme.secondary,
    fontWeight: '800',
  },
  subText: {
    fontSize: 12,
    color: theme.textLight,
    fontWeight: 'normal',
  },
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.primary,
  },
  totalLabelBold: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.text,
  },
  totalValueBold: {
    fontSize: 17,
    fontWeight: '900',
    color: theme.error,
  },
});
