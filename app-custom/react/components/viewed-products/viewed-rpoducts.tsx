import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { SimilarProductsVariants } from '../product-variants'; // Importa o componente filho

interface Product {
  productId: string;
  productName: string;
  linkText: string;
  items: {
    images: {
      imageUrl: string;
    }[];
  }[];
}

type Props ={
    children: any
}

const ProductListContext = createContext<Product[]>([]);

export const useProductList = () => useContext(ProductListContext);

export const VisitedProductsSlider: FC<Props> = ({ children }) => {
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const productContext = useProduct();

  useEffect(() => {
    if (productContext?.product?.productId) {
      const currentProductId = productContext.product.productId;
      addProductToVisited(currentProductId);
    }
  }, [productContext]);

  useEffect(() => {
    const productsFromStorage = localStorage.getItem('visitedProductIds');
    if (productsFromStorage) {
      const productIds: string[] = JSON.parse(productsFromStorage);
      fetchProductsByIds(productIds);
    }
  }, []);

  const addProductToVisited = (productId: string) => {
    let visitedProductIds: string[] = JSON.parse(localStorage.getItem('visitedProductIds') || '[]');

    if (visitedProductIds.includes(productId)) {
      visitedProductIds = visitedProductIds.filter(id => id !== productId);
    }

    visitedProductIds.push(productId);

    if (visitedProductIds.length > 8) {
      visitedProductIds.shift(); // Remove o primeiro item
    }

    localStorage.setItem('visitedProductIds', JSON.stringify(visitedProductIds));
  };

  const fetchProductsByIds = async (productIds: string[]) => {
    if (productIds.length === 0) return;

    try {
      const response = await fetch(`/api/catalog_system/pub/products/search?fq=productId:${productIds.join('&fq=productId:')}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVisitedProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <ProductListContext.Provider value={visitedProducts}>
      <div className="visited-products-slider">
        {visitedProducts.length > 0 ? (
          visitedProducts.map(product => (
            <div key={product.productId} className="product-item">
              <a href={`/${product.linkText}/p`}>
                <img src={product.items[0].images[0].imageUrl} alt={product.productName} />
                <h4>{product.productName}</h4>
              </a>
              {/* Renderiza o componente SimilarProductsVariants */}
              <SimilarProductsVariants productQuery={{ product }} />
              {/* Renderiza os componentes filhos passados */}
              {children}
            </div>
          ))
        ) : (
          <p>No products visited yet</p>
        )}
      </div>
    </ProductListContext.Provider>
  );
};
