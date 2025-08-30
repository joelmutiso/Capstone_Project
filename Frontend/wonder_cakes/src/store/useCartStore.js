import { create } from 'zustand';

const useECommerceStore = create((set) => ({
  // Product state and actions
  products: [],
  addProduct: (newProduct) => set((state) => {
    const productWithId = { ...newProduct, id: crypto.randomUUID() };
    return {
      products: [...state.products, productWithId],
    };
  }),

  // Cart state and actions
  cart: [],
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, product],
  })),

  // Authentication state and actions
  token: localStorage.getItem('token') || null,
  
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
  
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
}));

export default useECommerceStore;
