import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const loadedCart = await AsyncStorage.getItem('@GoMarket:products');

      if (loadedCart) {
        const allProducts = JSON.parse(loadedCart);
        setProducts(allProducts);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      const productInCart = products.find(p => p.id === product.id);

      if (productInCart) {
        setProducts(
          products.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        );
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      setProducts(
        products.map(p =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      );

      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productIndex = products.findIndex(p => p.id === id);

      if (products[productIndex].quantity === 1) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        setProducts(
          products.map(p =>
            p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
          ),
        );
      }

      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
