import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { theme } from '@constants/theme';
import { VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

export type MainTabsParamList = {
  ShopTab: undefined;
  CartTab: undefined;
  MeTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs: React.FC = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const cartBadge = totalQuantity > 0 ? totalQuantity : undefined;

  const isCartFirst = VARIANT.tabOrder === 'cartFirst';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textLight,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      {isCartFirst ? (
        <>
          <Tab.Screen
            name="CartTab"
            component={CartScreen}
            options={{
              tabBarLabel: 'Giỏ',
              tabBarBadge: cartBadge,
              tabBarBadgeStyle: { backgroundColor: theme.secondary, color: '#FFF' },
            }}
          />
          <Tab.Screen
            name="ShopTab"
            component={ShopStack}
            options={{
              tabBarLabel: 'Cửa hàng',
            }}
          />
          <Tab.Screen
            name="MeTab"
            component={MeScreen}
            options={{
              tabBarLabel: 'Tôi',
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="ShopTab"
            component={ShopStack}
            options={{
              tabBarLabel: 'Cửa hàng',
            }}
          />
          <Tab.Screen
            name="CartTab"
            component={CartScreen}
            options={{
              tabBarLabel: 'Giỏ',
              tabBarBadge: cartBadge,
              tabBarBadgeStyle: { backgroundColor: theme.secondary, color: '#FFF' },
            }}
          />
          <Tab.Screen
            name="MeTab"
            component={MeScreen}
            options={{
              tabBarLabel: 'Tôi',
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
