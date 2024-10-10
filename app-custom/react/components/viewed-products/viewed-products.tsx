import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { SliderLayout } from 'vtex.slider-layout'; // Importa o SliderLayout
import { SkuFromShelf } from '../shelfSku'; // Importa o componente filho

interface Sku {
  skuId: string;
  name: string;
  available: boolean;
}

interface Seller {
  addToCartLink: string;
  commertialOffer: {
    AvailableQuantity: number;
    BuyTogether: any[];
    CacheVersionUsedToCallCheckout: string;
    DeliverySlaSamples: any[];
    DeliverySlaSamplesPerRegion: { [key: string]: any };
    DiscountHighLight: any[];
    FullSellingPrice: number;
    GetInfoErrorMessage: string | null;
    GiftSkuIds: any[];
    Installments: {
      count: number;
      hasInterestRate: boolean;
      interestRate: number;
      value: number;
      total: number;
      sellerMerchantInstallments: any[];
    }[];
    IsAvailable: boolean; // Indica se o produto está disponível
    ItemMetadataAttachment: any[];
    ListPrice: number;
    PaymentOptions: {
      availableAccounts: any[];
      availableTokens: any[];
      giftCardMessages: any[];
      giftCards: any[];
      installmentOptions: {
        bin: string | null;
        installments: {
          count: number;
          hasInterestRate: boolean;
          interestRate: number;
          value: number;
          total: number;
        }[];
      }[];
      paymentGroupName: string;
      paymentName: string;
      paymentSystem: string;
      value: number;
    };
    PriceWithoutDiscount: number;
  };
}

interface Product {
  productId: string;
  productName: string;
  linkText: string;
  items: {
    itemId: string;
    name: string;
    variations: { [key: string]: string[] };
    images: { imageUrl: string }[];
    skus: Sku[]; // Lista de SKUs
    sellers: Seller[]; // Lista de sellers
  }[];
}

type Props = {
  children: any;
};

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

  // Filtra os produtos disponíveis em estoque
  const availableProducts = visitedProducts.filter(product => {
    return product.items[0].sellers[0].commertialOffer.IsAvailable; // Retorna apenas produtos disponíveis
  });

  return (
    <ProductListContext.Provider value={availableProducts}>
      <div className="visited-products-slider">
        {availableProducts.length > 0 ? (
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
            {availableProducts.map((product) => {
              const maxInstallment = product.items[0].sellers[0].commertialOffer.PaymentOptions.installmentOptions[2]?.installments.length - 1;
              const count = product.items[0].sellers[0].commertialOffer.PaymentOptions.installmentOptions[2]?.installments[maxInstallment].count;
              const maxInstallmentValue = product.items[0].sellers[0].commertialOffer.PaymentOptions.installmentOptions[2]?.installments[maxInstallment].value;
              const price = product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

              return (
                <div key={product.productId} className="product-item">
                  <a href={`/${product.linkText}/p`}>
                    <img
                      src={product.items[0].images[0].imageUrl}
                      alt={product.productName}
                    />
                    <h4>{product.productName}</h4>
                  </a>

                  <SkuFromShelf productQuery={{ product }} />

                  <p>R$ {price}</p>

                  {maxInstallment && (
                    <p>
                      ou {count}x sem juros de R${(maxInstallmentValue / 100).toFixed(2).replace('.', ',')} no cartão de crédito
                    </p>
                  )}
                  {children}
                </div>
              );
            })}
          </SliderLayout>
        ) : (
          <p>No products visited yet</p>
        )}
      </div>
    </ProductListContext.Provider>
  );
};
