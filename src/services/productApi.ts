import { apiClient } from './apiClient';
import { PRICE_MULTIPLIER } from '@constants/student';

export interface RawProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Product {
  id: string;
  originalId: number;
  title: string;
  rawPrice: number;
  price: number; // multiplied price
  formattedPrice: string;
  description: string;
  category: string;
  image: string;
}

// Vietnamese titles matching exam screenshots (Hình 2 & Hình 4)
const VN_PRODUCT_NAMES: Record<number, { title: string; image: string }> = {
  1: { title: 'Cơm nắm rong biển', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  2: { title: 'Trà sữa trân châu', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
  3: { title: 'Bút bi X-Gel', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400' },
  4: { title: 'Mì ly ăn liền KTX', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
  5: { title: 'Bánh mì chả lụa', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400' },
  6: { title: 'Nước suối 500ml', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400' },
  7: { title: 'Tập học sinh 200 trang', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
  8: { title: 'Cà phê muối KTX', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400' },
  9: { title: 'Snack khoai tây', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
  10: { title: 'Sữa tươi tiệt trùng', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  11: { title: 'Khăn giấy bỏ túi', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
  12: { title: 'Bút highlight dạ quang', image: 'https://images.unsplash.com/photo-1585336261026-91e03189913e?w=400' },
};

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get<RawProduct[]>('/products?limit=12');
  const data = response.data;

  return data.map((item) => {
    const vnInfo = VN_PRODUCT_NAMES[item.id] || { title: item.title, image: item.image };
    // Base unit price scaled cleanly
    const calculatedPrice = Math.round((item.price / 10) * PRICE_MULTIPLIER);
    const formattedPrice = `${calculatedPrice.toLocaleString('vi-VN')} đ`;

    return {
      id: String(item.id),
      originalId: item.id,
      title: vnInfo.title,
      rawPrice: item.price,
      price: calculatedPrice,
      formattedPrice,
      description: item.description || 'Giao nội khu - nhận tận phòng ký túc xá. Đồ tươi ngon, phục vụ nhanh chóng.',
      category: item.category,
      image: item.image || vnInfo.image,
    };
  });
}
