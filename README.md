# Họ tên: NGUYEN DINH CHI THANH | MSSV: 23722451 | URL: https://github.com/23722451/23722451_TH2.git | Stamp: #859345 | Số cuối: 1 | VARIANT: watermarkAtTop=false, authField=phone, tabOrder=shopFirst, hapticOnAdd=selection, shipFormula=B, detailPresentation=card

## KTXGo — Dịch vụ giao đồ tận phòng Ký túc xá

### Thông tin bài thi Thực hành 2 (TH2)
- **Họ và tên thí sinh**: NGUYỄN ĐÌNH CHÍ THÀNH
- **Mã số sinh viên**: 23722451
- **Mã đề thi (Stamp)**: `#859345`
- **Số cuối MSSV**: `1`

### Cấu hình biến thể (VARIANT theo MSSV 23722451)
- `watermarkAtTop`: `false` (Dưới)
- `authField`: `'phone'`
- `tabOrder`: `'shopFirst'` (Cửa hàng → Giỏ → Tôi)
- `hapticOnAdd`: `'selection'`
- `shipFormula`: `'B'` (BASE_SHIP_FEE + Math.round(km * 1500) + 2000)
- `detailPresentation`: `'card'`
- `DEBOUNCE_MS`: `400`
- `STALE_TIME_MS`: `21000`
- `PRICE_MULTIPLIER`: `20500`
- `BASE_SHIP_FEE`: `9000`
- `ROOM_LABEL`: `P.151`

### Công nghệ sử dụng
1. **React Native CLI + TypeScript**
2. **React Navigation V7**: AuthStack, MainTabs, ShopStack
3. **State Management & Persist**: Zustand + Persist AsyncStorage (`ktxgo-cart-23722451`)
4. **Data Fetching**: TanStack React Query V5 + Axios (Interceptor `X-Student-Id: 23722451`)
5. **List rendering**: `@shopify/flash-list` (`numColumns={2}`)
6. **Location & Haptic**: Custom Hooks (`useCampusLocation`, `useDebouncedValue`)

### Hướng dẫn chạy ứng dụng
```bash
npm install
npx react-native run-android
```
