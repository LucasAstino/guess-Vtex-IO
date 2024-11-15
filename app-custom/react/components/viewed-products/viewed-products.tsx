import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProduct } from "vtex.product-context";
import { SliderLayout } from "vtex.slider-layout";
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import { useOrderForm } from "vtex.order-manager/OrderForm";

export const HANDLES_VIEWED = [
  "visited-products-slider",
  "title__viewed-product",
  "product__viewed-name",
  "product__viewed-container",
  "product__viewed-wrapper",
  "product__viewed-item",
  "product__viewed-link",
  "product__viewed-image",
  "product__viewed-price",
  "product__viewed-installments",
  "product__viewed-addtocart",
  "product__viewed-addtocart--plus",
  "modal",
  "modalOverlay",
  "modalContent",
  "modalContent__alert-visible",
  "modalContent__alert-visible-span",
  "modalContent__alert-hidden",
  "closeButton",
] as const;

interface Sku {
  skuId: string;
  name: string;
  available: boolean;
}

interface Seller {
  addToCartLink: string;
  commertialOffer: {
    AvailableQuantity: number;
    PriceWithoutDiscount: number;
    PaymentOptions: {
      installmentOptions: {
        installments: {
          count: number;
          value: number;
        }[];
      }[];
      price: string;
    };
    IsAvailable: boolean;
  };
}

interface Product {
  productId: string;
  productName: string;
  linkText: string;
  items: {
    itemId: string;
    name: string;
    skus: Sku[];
    sellers: Seller[];
    images: { imageUrl: string }[];
  }[];
}

type OrderFormItem = {
  id: string;
  name: string;
  quantity: number;
};

type Props = {
  children: any;
};

const ProductListContext = createContext<Product[]>([]);

export const useProductList = () => useContext(ProductListContext);

export const VisitedProductsSlider: FC<Props> = () => {
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productContext = useProduct();
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(HANDLES_VIEWED);
  const { orderForm } = useOrderForm();
  const [prevOrderFormItems, setPrevOrderFormItems] = useState<OrderFormItem[]>(
    []
  );
  const [productAdded, setProductAdded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (productContext?.product?.productId) {
      const currentProductId = productContext.product.productId;
      addProductToVisited(currentProductId);
    }
  }, [productContext]);

  useEffect(() => {
    const productsFromStorage = localStorage.getItem("visitedProductIds");
    if (productsFromStorage) {
      const productIds: string[] = JSON.parse(productsFromStorage);
      fetchProductsByIds(productIds);
    }
  }, []);

  useEffect(() => {
    if (orderForm && orderForm.items) {
      if (initialLoad) {
        setPrevOrderFormItems(orderForm.items);
        setInitialLoad(false);
        return;
      }

      const itemAdded = orderForm.items.some((item: any, index: any) => {
        const prevItem = prevOrderFormItems[index];
        return !prevItem || item.quantity > prevItem.quantity;
      });

      if (itemAdded) {
        setProductAdded(true);

        const timer = setTimeout(() => {
          setProductAdded(false);
        }, 3000);

        return () => clearTimeout(timer);
      }

      setPrevOrderFormItems(orderForm.items);
    }
    return undefined;
  }, [orderForm.items, initialLoad]);

  const addProductToVisited = (productId: string) => {
    let visitedProductIds: string[] = JSON.parse(
      localStorage.getItem("visitedProductIds") || "[]"
    );
    if (visitedProductIds.includes(productId)) {
      visitedProductIds = visitedProductIds.filter((id) => id !== productId);
    }
    visitedProductIds.push(productId);
    if (visitedProductIds.length > 8) {
      visitedProductIds.shift();
    }
    localStorage.setItem(
      "visitedProductIds",
      JSON.stringify(visitedProductIds)
    );
  };

  const fetchProductsByIds = async (productIds: string[]) => {
    if (productIds.length === 0) return;
    try {
      const response = await fetch(
        `/api/catalog_system/pub/products/search?fq=productId:${productIds.join(
          "&fq=productId:"
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVisitedProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const availableProducts = visitedProducts.filter((product) => {
    return product.items[0].sellers[0].commertialOffer.IsAvailable;
  });

  return (
    <ProductListContext.Provider value={availableProducts}>
      <div className={handles["visited-products-slider"]}>
        {availableProducts.length > 0 ? (
          <>
            <h2 className={handles["title__viewed-product"]}>
              Vistos recentemente
            </h2>
            {isMobile || availableProducts.length >= 4 ? (
              <SliderLayout
                itemsPerPage={{
                  desktop: 4,
                  tablet: 2,
                  phone: 2,
                }}
                showNavigationArrows="always"
                showPaginationDots="never"
                fullWidth
              >
                {availableProducts.map((product) => {
                  const maxInstallment =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments.length - 0;
                  const count =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments.length || 1;
                  const maxInstallmentValue =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments[maxInstallment]
                      ?.value ||
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0].installments[0].value;
                  const price =
                    product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount.toLocaleString(
                      "pt-BR",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    );
                  const image = product.items[0].images[0].imageUrl.replace(
                    /(ids\/\d+)/,
                    "$1-507-736"
                  );

                  return (
                    <div
                      key={product.productId}
                      className={handles["product__viewed-item"]}
                    >
                      <a
                        className={handles["product__viewed-link"]}
                        href={`/${product.linkText}/p`}
                      >
                        <div className={handles["product__viewed-wrapper"]}>
                          <img
                            className={handles["product__viewed-image"]}
                            src={image}
                            alt={product.productName}
                          />
                          <button
                            className={handles["product__viewed-addtocart"]}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleOpenModal(product);
                            }}
                          >
                            Add
                          </button>
                        </div>
                        <h3 className={handles["product__viewed-name"]}>
                          {product.productName}
                        </h3>
                      </a>
                      <p className={handles["product__viewed-price"]}>
                        R$ {price}
                      </p>
                      {console.log(product)}
                      {maxInstallment && (
                        <p className={handles["product__viewed-installments"]}>
                          {console.log(maxInstallment)}
                          ou {count}x sem juros de R$
                          {(maxInstallmentValue / 100)
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          no cartão de crédito
                        </p>
                      )}
                    </div>
                  );
                })}
              </SliderLayout>
            ) : (
              <div className={handles["product__viewed-container"]}>
                {availableProducts.map((product) => {
                  const maxInstallment =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments.length - 0;
                  const count =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments.length || 1;
                  const maxInstallmentValue =
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0]?.installments[maxInstallment]
                      ?.value ||
                    product.items[0].sellers[0].commertialOffer.PaymentOptions
                      .installmentOptions[0].installments[0].value;
                  const price =
                    product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount.toLocaleString(
                      "pt-BR",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    );
                  const image = product.items[0].images[0].imageUrl.replace(
                    /(ids\/\d+)/,
                    "$1-500-724"
                  );

                  return (
                    <div
                      key={product.productId}
                      className={handles["product__viewed-item"]}
                    >
                      <a
                        className={handles["product__viewed-link"]}
                        href={`/${product.linkText}/p`}
                      >
                        <div className={handles["product__viewed-wrapper"]}>
                          <img
                            className={handles["product__viewed-image"]}
                            src={image}
                            alt={product.productName}
                          />
                          <button
                            className={handles["product__viewed-addtocart"]}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleOpenModal(product);
                            }}
                          >
                            Add
                          </button>
                        </div>
                        <h3 className={handles["product__viewed-name"]}>
                          {product.productName}
                        </h3>
                      </a>

                      <p className={handles["product__viewed-price"]}>
                        R$ {price}
                      </p>

                      {console.log(maxInstallment)}
                      {console.log(product)}
                      {maxInstallment && (
                        <p className={handles["product__viewed-installments"]}>
                          {console.log(maxInstallment, "parcela")}
                          ou {count}x sem juros de R$
                          {(maxInstallmentValue / 100)
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          no cartão de crédito
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className={handles.modalOverlay}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className={handles.modalContent}
            style={{
              backgroundColor: "#F9F9F9",
              position: "relative",
            }}
          >
            <button
              className={handles.closeButton}
              onClick={handleCloseModal}
              style={{ position: "absolute", top: "0px", right: "10px" }}
            >
              +
            </button>
            <SkuFromShelf productQuery={{ product: selectedProduct }} />
            <div
              className={
                productAdded
                  ? handles["modalContent__alert-visible"]
                  : handles["modalContent__alert-hidden"]
              }
            >
              <p>
                Produto adicionado a{" "}
                <span className={handles["modalContent__alert-visible-span"]}>
                  Sacola
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </ProductListContext.Provider>
  );
};
