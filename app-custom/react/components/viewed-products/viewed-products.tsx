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
import { useApolloClient } from "react-apollo";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { CustomModal } from "../modal/index";
import Viewed from "../../queries/viewed.gql";

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
  "product__viewed-price--list",
  "product__viewed-price--value",
  "product__viewed-price--discount",
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
    Installments: {
      NumberOfInstallments: number;
      count: number;
      Value: number;
    }[];
    ListPrice: number;
    Price: number;
    IsAvailable: boolean;
  };
}

interface Variation {
  name: string;
  values: string[];
  __typename: string;
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
    variations?: Variation[];
    images: { imageUrl: string }[];
    __typename: string;
  }[];
}

type Props = {
  children: any;
};

const ProductListContext = createContext<Product[]>([]);

export const useProductList = () => useContext(ProductListContext);

export const VisitedProductsSlider: FC<Props> = () => {
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const productContext = useProduct();
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(HANDLES_VIEWED);
  const client = useApolloClient();
  const { orderForm } = useOrderForm();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (productContext?.product?.productId) {
      const currentProductId = productContext.product.productId;
      addProductToVisited(currentProductId);
    }
  }, [productContext]);

  useEffect(() => {
    if (orderForm && orderForm.items) {
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }
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

  const fetchProductsByIdGQL = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      const { data } = await client.query({
        query: Viewed,
        variables: {
          identifier: { field: "id", value: productId },
        },
      });
      return data?.product || null;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadVisitedProducts = async () => {
      const productsFromStorage = localStorage.getItem("visitedProductIds");
      if (productsFromStorage) {
        const productIds: string[] = JSON.parse(productsFromStorage);

        // Busca todos os produtos e filtra os valores nulos
        const fetchedProducts = await Promise.all(
          productIds.map((id) => fetchProductsByIdGQL(id))
        );
        const validProducts = fetchedProducts.filter(
          (product): product is Product => !!product
        );

        // Atualiza o estado somente após concluir todas as requisições
        setVisitedProducts(validProducts);
      }
    };

    loadVisitedProducts();
  }, [client]);

  const availableProducts = visitedProducts.filter((product) => {
    return product.items[0].sellers[0].commertialOffer.AvailableQuantity;
  });

  return (
    <ProductListContext.Provider value={availableProducts}>
      <div className={handles["visited-products-slider"]}>
        {console.log(availableProducts, "nnnnnnnnnnn")}
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
                  console.log(product, "prod");
                  const maxInstallment =
                    product.items[0].sellers[0].commertialOffer.Installments[0]
                      .NumberOfInstallments;
                  const count =
                    product.items[0].sellers[0].commertialOffer.Installments[0]
                      .NumberOfInstallments;
                  const maxInstallmentValue =
                    product.items[0].sellers[0].commertialOffer.Installments[0]
                      .Value;
                  console.log("valueeee", maxInstallmentValue);
                  const price =
                    product.items[0].sellers[0].commertialOffer.Price.toLocaleString(
                      "pt-BR",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    );
                  const listPrice =
                    product.items[0].sellers[0].commertialOffer.ListPrice.toLocaleString(
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
                      {console.log(product, "viewed")}
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
                          <CustomModal>
                            <button className="guessbr-agenciafg-custom-0-x-product__viewed-addtocart">
                              Add
                            </button>
                            <SkuFromShelf productQuery={{ product: product }} />
                          </CustomModal>
                        </div>
                        <h3 className={handles["product__viewed-name"]}>
                          {product.productName}
                        </h3>
                      </a>
                      <p className={handles["product__viewed-price"]}>
                        {listPrice !== price && (
                          <span
                            className={handles["product__viewed-price--list"]}
                          >
                            R$ {listPrice}
                          </span>
                        )}

                        <span
                          className={handles["product__viewed-price--value"]}
                        >
                          R$ {price}
                        </span>
                        {listPrice !== price && (
                          <span
                            className={
                              handles["product__viewed-price--discount"]
                            }
                          >
                            (
                            {Math.round(
                              ((parseFloat(listPrice as unknown as string) -
                                parseFloat(price as unknown as string)) /
                                parseFloat(listPrice as unknown as string)) *
                                100
                            )}
                            % Off)
                          </span>
                        )}
                      </p>
                      {console.log(product)}
                      {maxInstallment && (
                        <p className={handles["product__viewed-installments"]}>
                          {console.log(maxInstallment)}
                          ou {count}x sem juros de R${" "}
                          {maxInstallmentValue.toFixed(2).replace(".", ",")} no
                          cartão de crédito
                        </p>
                      )}
                    </div>
                  );
                })}
              </SliderLayout>
            ) : (
              <div className={handles["product__viewed-container"]}></div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </ProductListContext.Provider>
  );
};
