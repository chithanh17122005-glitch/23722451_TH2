import { apiClient } from './apiClient';

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
  price: number;
  formattedPrice: string;
  description: string;
  category: string;
  image: string;
}

// Danh sách 12 món ăn Việt Nam truyền thống & phổ biến cho sinh viên KTX (Giá hợp lý: 18.000đ - 40.000đ)
export const VN_FOOD_PRODUCTS: Array<{
  id: number;
  title: string;
  basePrice: number;
  category: string;
  description: string;
  image: string;
}> = [
  {
    id: 1,
    title: 'Bánh mì đặc biệt KTX',
    basePrice: 25000,
    category: 'Món chính',
    description: 'Bánh mì giòn rụm kẹp pa tê thơm lừng, thịt chả lụa, dưa leo và rau ngò tươi.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Phở bò Tái Nạm',
    basePrice: 35000,
    category: 'Món nước',
    description: 'Phở bò truyền thống nước dùng hầm xương ngọt thanh, thịt bò tươi mềm dai ngon.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Cơm tấm Sườn Bì Chả',
    basePrice: 35000,
    category: 'Món chính',
    description: 'Cơm tấm hạt dẻo thơm, sườn nướng mật ong đậm đà kết hợp chả trứng béo ngậy.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Bún bò Huế đặc biệt',
    basePrice: 40000,
    category: 'Món nước',
    description: 'Bún bò chuẩn vị xứ Huế, nước dùng sa tế cay nồng thơm mùi sả, thịt nạm giòn.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Trà sữa Trân châu Đường đen',
    basePrice: 25000,
    category: 'Đồ uống',
    description: 'Trà sữa béo ngậy mát lạnh, hạt trân châu đường đen dẻo thơm ngạt ngào.',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Bún đậu Mắm tôm KTX',
    basePrice: 39000,
    category: 'Món chính',
    description: 'Bún đậu đầy đủ chả cốm giòn tan, nem chua nướng, thịt luộc kèm mắm tôm đậm đà.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Cà phê Muối KTX',
    basePrice: 20000,
    category: 'Đồ uống',
    description: 'Cà phê pha phin thơm lừng kết hợp lớp kem mặn béo ngậy đặc trưng KTX.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Gỏi cuốn Tôm Thịt (3 cuốn)',
    basePrice: 25000,
    category: 'Ăn vặt',
    description: 'Gỏi cuốn tôm tươi, thịt luộc, bún tươi và rau thơm chấm sốt tương bơ đậu phụng.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Hủ tiếu Nam Vang',
    basePrice: 35000,
    category: 'Món nước',
    description: 'Hủ tiếu Nam Vang thơm ngon với tôm tươi, thịt băm, trứng cút và nước dùng đậm đà.',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Bánh bao Nhân thịt Trứng cút',
    basePrice: 18000,
    category: 'Ăn vặt',
    description: 'Bánh bao nóng hổi vỏ xốp mịn, nhân thịt mộc nhĩ đẫm đà kèm 2 trứng cút béo bùi.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Mì trộn Trứng muối Xúc xích',
    basePrice: 28000,
    category: 'Món chính',
    description: 'Mì trộn sốt trứng muối ngậy béo bơ tỏi, kèm xúc xích nướng vàng ươm thơm phức.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Nước cam Tươi ép 500ml',
    basePrice: 20000,
    category: 'Đồ uống',
    description: 'Cam sành vắt tươi 100% ngọt mát tự nhiên, bổ sung vitamin C năng lượng.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop',
  },
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<RawProduct[]>('/products?limit=12').catch(() => null);
    const apiData = response?.data;

    return VN_FOOD_PRODUCTS.map((vnItem, index) => {
      const rawItem = apiData && apiData[index] ? apiData[index] : null;
      const finalPrice = vnItem.basePrice;
      const formattedPrice = `${finalPrice.toLocaleString('vi-VN')} đ`;

      return {
        id: String(vnItem.id),
        originalId: vnItem.id,
        title: vnItem.title,
        rawPrice: rawItem ? rawItem.price : vnItem.basePrice / 1000,
        price: finalPrice,
        formattedPrice,
        description: vnItem.description,
        category: vnItem.category,
        image: vnItem.image,
      };
    });
  } catch (error) {
    return VN_FOOD_PRODUCTS.map((vnItem) => ({
      id: String(vnItem.id),
      originalId: vnItem.id,
      title: vnItem.title,
      rawPrice: vnItem.basePrice / 1000,
      price: vnItem.basePrice,
      formattedPrice: `${vnItem.basePrice.toLocaleString('vi-VN')} đ`,
      description: vnItem.description,
      category: vnItem.category,
      image: vnItem.image,
    }));
  }
}
