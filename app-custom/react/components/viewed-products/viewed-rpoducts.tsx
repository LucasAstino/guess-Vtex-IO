import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { SliderLayout } from 'vtex.slider-layout'; // Importa o SliderLayout
import { SkuFromShelf } from '../shelfSku'; // Importa o componente filho

interface Sku {
  skuId: string;
  name: string;
  available: boolean;
}

interface Product {
  productId: string;
  productName: string;
  linkText: string;
  items: {
    itemId: string;
    name: string;
    variations: { [key: string]: string[] }; // Ex: { "Color": ["Red", "Blue"] }
    images: { imageUrl: string }[];
    skus: Sku[]; // Lista de SKUs
  }[];
}

type Props = {
  children: any;
};

const ProductListContext = createContext<Product[]>([]);

export const useProductList = () => useContext(ProductListContext);

export const VisitedProductsSlider: FC<Props> = ({ children }) => {
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // Cor selecionada
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null); // SKU selecionado
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
      const response = await fetch(
        `/api/catalog_system/pub/products/search?fq=productId:${productIds.join('&fq=productId:')}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVisitedProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedSku(null); // Reseta o SKU selecionado quando uma nova cor é selecionada
  };

  const handleSkuSelect = (sku: Sku) => {
    if (selectedColor) {
      setSelectedSku(sku);
    }
  };

  return (
    <ProductListContext.Provider value={visitedProducts}>
      <div className="visited-products-slider">
        {visitedProducts.length > 0 ? (
          <SliderLayout
            itemsPerPage={{
              desktop: 4,
              tablet: 2,
              phone: 1,
            }}
            showNavigationArrows="desktopOnly"
            showPaginationDots="always"
            fullWidth
          >
            {visitedProducts?.map(product => (
              <div key={product.productId} className="product-item">
                <a href={`/${product.linkText}/p`}>
                  <img src={product.items[0].images[0].imageUrl} alt={product.productName} />
                  <h4>{product.productName}</h4>
                </a>

                {/* Seletor de cores */}
                <div className="color-selector">
                  {product.items[0].variations['Color']?.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: color }}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                {/* Seletor de SKUs */}
                <div className="sku-selector">
                  {console.log(selectedSku)}
                  {product.items[0].skus?.map(sku => (
                    <button
                      key={sku.skuId}
                      disabled={!selectedColor}
                      onClick={() => handleSkuSelect(sku)}
                      style={{
                        opacity: selectedColor ? 1 : 0.5,
                        cursor: selectedColor ? 'pointer' : 'not-allowed',
                      }}
                    >
                      {sku.name} {sku.available ? '(Available)' : '(Out of stock)'}
                    </button>
                  ))}
                </div>

                {/* Renderiza o componente SimilarProductsVariants */}
                <SkuFromShelf productQuery={{ product }} />

                {/* Renderiza os componentes filhos passados */}
                {children}
              </div>
            ))}
          </SliderLayout>
        ) : (
          <p>No products visited yet</p>
        )}
      </div>
    </ProductListContext.Provider>
  );
};
