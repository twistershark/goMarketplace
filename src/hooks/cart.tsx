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
      const loadedCart = await AsyncStorage.getItem('@GoMarket:cart');

      if (loadedCart) {
        const allProducts = JSON.parse(loadedCart);
        setProducts(allProducts);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(async (product: Product) => {
    const loadedCart = await AsyncStorage.getItem('@GoMarket:cart');

    if (loadedCart) {
      const parsedCart = JSON.parse(loadedCart);

      const productIndex = parsedCart.findIndex(
        (productInCart: Product) => productInCart.id === product.id,
      );

      if (productIndex < 0) {
        const newCart = [
          ...parsedCart,
          {
            id: product.id,
            image_url: product.image_url,
            price: product.price,
            title: product.title,
            quantity: 1,
          },
        ];

        await AsyncStorage.setItem('@GoMarket:cart', JSON.stringify(newCart));

        setProducts(newCart);
      } else {
        parsedCart.splice(productIndex, 1, {
          id: parsedCart[productIndex].id,
          image_url: parsedCart[productIndex].image_url,
          price: parsedCart[productIndex].price,
          title: parsedCart[productIndex].title,
          quantity: parsedCart[productIndex].quantity + 1,
        });

        await AsyncStorage.setItem(
          '@GoMarket:cart',
          JSON.stringify(parsedCart),
        );
        setProducts(parsedCart);
      }
    }
  }, []);

  const increment = useCallback(async id => {
    const loadedCart = await AsyncStorage.getItem('@GoMarket:cart');

    if (loadedCart) {
      const parsedCart = JSON.parse(loadedCart);

      const productIndex = parsedCart.findIndex(
        (product: Product) => product.id === id,
      );

      parsedCart.splice(productIndex, 1, {
        id: parsedCart[productIndex].id,
        image_url: parsedCart[productIndex].image_url,
        price: parsedCart[productIndex].price,
        title: parsedCart[productIndex].title,
        quantity: parsedCart[productIndex].quantity + 1,
      });

      await AsyncStorage.setItem('@GoMarket:cart', JSON.stringify(parsedCart));
      setProducts(parsedCart);
    }
  }, []);

  const decrement = useCallback(async id => {
    const loadedCart = await AsyncStorage.getItem('@GoMarket:cart');

    if (loadedCart) {
      const parsedCart = JSON.parse(loadedCart);

      const productIndex = parsedCart.findIndex(
        (product: Product) => product.id === id,
      );

      if (parsedCart[productIndex].quantity === 1) {
        const newCart = parsedCart.filter(
          (product: Product) => product.id !== id,
        );

        await AsyncStorage.setItem('@GoMarket:cart', JSON.stringify(newCart));

        setProducts(newCart);
      } else {
        parsedCart.splice(productIndex, 1, {
          id: parsedCart[productIndex].id,
          image_url: parsedCart[productIndex].image_url,
          price: parsedCart[productIndex].price,
          title: parsedCart[productIndex].title,
          quantity: parsedCart[productIndex].quantity - 1,
        });

        await AsyncStorage.setItem(
          '@GoMarket:cart',
          JSON.stringify(parsedCart),
        );

        setProducts(parsedCart);
      }
    }
  }, []);

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
