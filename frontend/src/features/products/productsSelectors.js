export const selectAllProducts = state => state.products.items;
export const selectProductById = state => state.products.item;
export const selectProductsLoading = state => state.products.loading;
export const selectProductsError = state => state.products.error;
