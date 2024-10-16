import React, { useState, useEffect } from "react";
import type { ProductTypes } from "vtex.product-context";
import { useProduct } from "vtex.product-context";
import { useQuery } from "react-apollo";
import { useCssHandles } from "vtex.css-handles";
import { useOrderItems } from "vtex.order-items/OrderItems";
import productRecommendationsQuery from "../../queries/productRecommendations.gql";

export const HANDLES_VARIANTS = [
  "similar__products-variants--fastBuy",
  "similar__products-variants--title",
  "variant-type",
  "similar__products-variants--wrap",
  "similar__products-variants--sku",
  "similar__products-variants--sku-unavailable",
  "similar__products-variants--sku-title",
  "similar__products-variants--img-current",
  "similar__products-variants--circle",
  "similar__products-variants--circle-unavailable",
  "similar__products-variants--link",
  "similar__image-container",
  "similar__image-container-unavailable",
  "similar__image-container--current",
] as const;

interface SkuSpecification {
  field: {
    id: number;
    isActive: boolean;
    name: string;
    position: number;
    type: string;
  };
  values: {
    id: string;
    name: string;
    position: number;
  }[];
}

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string;
      skuSpecifications?: SkuSpecification[];
    };
  };
  imageLabel?: string;
}

export function SkuFromShelf({ productQuery }: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS);
  const product = useProduct();
  const { addItem } = useOrderItems();
  // const color = product?.selectedItem?.variations?.[1]?.values?.[0] || "N/A";
  const productId =
    productQuery?.product?.productId ?? product?.product?.productId;
    // const backgroundColor =
    //  product?.selectedItem?.variations?.[2]?.values?.[0] || "N/A";

     const currentColor =
    productQuery.product.skuSpecifications?.[1].values[0].name;
     const currentColorCode =
    productQuery.product.skuSpecifications?.[2].values[0].name;

  const fetchSkusByColor = async (colorProductId: string) => {
    try {
      const response = await fetch(
        `/api/catalog_system/pub/products/variations/${colorProductId}`
      );
      const data = await response.json();
      if (Array.isArray(data.skus)) {
        return data.skus; // Retorna os SKUs da nova cor
      }
    } catch (error) {
      console.error("Erro ao buscar SKUs:", error);
      return [];
    }
  };

  const [skusTamanho, setSkusTamanho] = useState<ProductTypes.Item[]>([]);

  // Carregar SKUs da primeira cor na montagem do componente
  useEffect(() => {
    const loadInitialSkus = async () => {
      const initialSkus = await fetchSkusByColor(productQuery.product.productId);
      setSkusTamanho(initialSkus);
    };
    loadInitialSkus();
  }, [productQuery.product.productId]);

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: "id", value: productId },
      type: "similars",
    },
    skip: !productId,
  });

  if (loading || error) return null;

  const { productRecommendations } = data;
  const products = productRecommendations || [];
  const unique = [
    ...new Set<string>(
      products.map((item: ProductTypes.Product) => item.productId)
    ),
  ];

  const items: ProductTypes.Product[] = unique
    .map((id) =>
      products.find((element: ProductTypes.Product) => element.productId === id)
    )
    .filter(Boolean) as ProductTypes.Product[];

  const handleColorClick = async (colorProductId: string) => {
    const newSkus = await fetchSkusByColor(colorProductId);
    setSkusTamanho(newSkus); // Atualiza os SKUs com os da nova cor
  };

  const handleAddToCart = (skuId: string) => {
    const itemToAdd = {
      id: skuId,
      quantity: 1,
      seller: "1",
    };
    addItem([itemToAdd]);
  };

  return (
    <>
      <div className={handles["similar__products-variants--fastBuy"]}>
         <p className={handles["similar__products-variants--title"]}>
         Selecione uma cor: <span className={handles["variant-type"]}>{currentColor}</span>
         </p>
         <div style={{ display: "flex" }} className={handles["similar__products-variants--wrap"]}>
           <div className={`${handles["similar__image-container"]} ${handles["similar__image-container--current"]}`}>
             <span
               className={handles["similar__products-variants--circle"]}
               style={{
                 height: "30px",
                 width: "30px",
                 backgroundColor: currentColorCode,
                 display: "block",
               }}
             ></span>
           </div>
           {items.map((element: ProductTypes.Product, index: number) => {
             const bgColor =
               element?.items?.[0].variations?.[2]?.values?.[0] || "N/A";
               const available = element?.items?.[0]?.sellers?.[0]?.commertialOffer?.AvailableQuantity > 0 
             return (
               <div key={index} className={`${handles["similar__image-container"]} ${!available ? handles["similar__image-container-unavailable"] : ''}`}>
                 <span
                    className={`${handles["similar__products-variants--circle"]} ${!available ? handles["similar__products-variants--circle-unavailable"] : ''}`}
                   style={{
                     height: "30px",
                     width: "30px",
                     backgroundColor: bgColor,
                     display: "block",
                   }}
                   onClick={() => handleColorClick(element.productId)}
                 ></span>
               </div>
             );
           })}
         </div>
       </div>

      <div>
        {skusTamanho.length > 0 ? (
          skusTamanho.map((sku: any, index: number) => (
            <div key={index}>
              <p className={handles["similar__products-variants--sku-title"]}>Selecione um tamanho: {sku.dimensions.Tamanho}</p>
              <span className={sku.available ? handles["similar__products-variants--sku"] : handles["similar__products-variants--sku-unavailable"]} onClick={() => handleAddToCart(sku.sku)}>
                {sku.dimensions.Tamanho || `SKU ${index + 1}`}
              </span>
            </div>
          ))
        ) : (
          <span>Sem SKUs disponíveis</span>
        )}
      </div>
    </>
  );
}

SkuFromShelf.schema = {
  title: "SimilarProducts Variants",
  description: "SimilarProducts Variants",
  type: "object",
  properties: {},
};
