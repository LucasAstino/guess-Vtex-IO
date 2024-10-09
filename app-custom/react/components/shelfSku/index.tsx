// import React from "react";
// import type { ProductTypes } from "vtex.product-context";
// import { useProduct } from "vtex.product-context";
// import { useQuery } from "react-apollo";
// import { useCssHandles } from "vtex.css-handles";
// import productRecommendationsQuery from "../../queries/productRecommendations.gql";

// export const HANDLES_VARIANTS = [
//   "similar__products-variants",
//   "similar__products-variants--title",
//   "variant-type",
//   "similar__products-variants--wrap",
//   "similar__products-variants--img-current",
//   "similar__products-variants--circle",
//   "similar__products-variants--link",
//   "similar__image-container",
//   "similar__image-container--current",
// ] as const;

// interface SimilarProductsVariantsProps {
//   productQuery: {
//     product: {
//       productId: string;
//     };
//   };
//   imageLabel?: string;
// }

// export function SkuFromShelf({ productQuery }: SimilarProductsVariantsProps) {
//   const { handles } = useCssHandles(HANDLES_VARIANTS);
//   const product = useProduct();
//   const color = product?.selectedItem?.variations?.[1]?.values?.[0] || "N/A";
//   const backgroundColor =
//     product?.selectedItem?.variations?.[2]?.values?.[0] || "N/A";
//   const productId =
//     productQuery?.product?.productId ?? product?.product?.productId;

//   console.log(productQuery.product, "testeeee");

//   const skus = product?.product?.skuSpecifications[0]?.values || [];

//   const { data, loading, error } = useQuery(productRecommendationsQuery, {
//     variables: {
//       identifier: { field: "id", value: productId },
//       type: `similars`,
//     },
//     skip: !productId,
//   });

//   if (loading || error) return null;

//   const { productRecommendations } = data;
//   const products = productRecommendations || [];
//   const unique = [
//     ...new Set<string>(
//       products.map((item: ProductTypes.Product) => item.productId)
//     ),
//   ];

//   const items: ProductTypes.Product[] = unique
//     .map((id) => products.find((element: ProductTypes.Product) => element.productId === id))
//     .filter(Boolean) as ProductTypes.Product[];

//   const populateCart = async (skuId: string) => {
//     const response = await fetch(`/api/catalog_system/pub/products/variations/${skuId}`);
//     const data = await response.json();
//     console.log(data, "retorno");
//   };

//   return (
//     <>
//       <div className={handles["similar__products-variants"]}>
//         <p className={handles["similar__products-variants--title"]}>
//           Cor: <span className={handles["variant-type"]}>{color}</span>
//         </p>
//         <div style={{ display: "flex" }} className={handles["similar__products-variants--wrap"]}>
//           <div className={`${handles["similar__image-container"]} ${handles["similar__image-container--current"]}`}>
//             <span
//               className={handles["similar__products-variants--circle"]}
//               style={{
//                 height: "20px",
//                 width: "20px",
//                 backgroundColor: backgroundColor,
//                 display: "block",
//               }}
//             ></span>
//           </div>
//           {items.map((element: ProductTypes.Product, index: number) => {
//             const bgColor =
//               element?.items?.[0].variations?.[2]?.values?.[0] || "N/A";
//             return (
//               <div key={index} className={handles["similar__image-container"]}>
//                 <span
//                   className={handles["similar__products-variants--circle"]}
//                   style={{
//                     height: "20px",
//                     width: "20px",
//                     backgroundColor: bgColor,
//                     display: "block",
//                   }}
//                 ></span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Renderização dos SKUs */}
//       <div className="lambeeeeeeee">
//         {skus.length > 0 ? (
//           skus.map((sku: any, index: number) => (
//             <span onClick={() => populateCart(productId)} key={index}>
//               {sku.name ? sku.name : `SKU #${index + 1}`}
//             </span>
//           ))
//         ) : (
//           <span>Sem SKUs disponíveis</span>
//         )}
//       </div>
//     </>
//   );
// }

// SkuFromShelf.schema = {
//   title: "SimilarProducts Variants",
//   description: "SimilarProducts Variants",
//   type: "object",
//   properties: {},
// };

import React from "react";
import type { ProductTypes } from "vtex.product-context";
import { useProduct } from "vtex.product-context";
import { useQuery } from "react-apollo";
import { useCssHandles } from "vtex.css-handles";
import { useOrderItems } from "vtex.order-items/OrderItems";
import productRecommendationsQuery from "../../queries/productRecommendations.gql";

export const HANDLES_VARIANTS = [
  "similar__products-variants",
  "similar__products-variants--title",
  "variant-type",
  "similar__products-variants--wrap",
  "similar__products-variants--img-current",
  "similar__products-variants--circle",
  "similar__products-variants--link",
  "similar__image-container",
  "similar__image-container--current",
] as const;

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string;
    };
  };
  imageLabel?: string;
}

export function SkuFromShelf({ productQuery }: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS);
  const product = useProduct();
  const { addItem } = useOrderItems(); // Hook para adicionar itens ao carrinho
  const color = product?.selectedItem?.variations?.[1]?.values?.[0] || "N/A";
  const backgroundColor =
    product?.selectedItem?.variations?.[2]?.values?.[0] || "N/A";
  const productId =
    productQuery?.product?.productId ?? product?.product?.productId;

  const skus = product?.product?.skuSpecifications[0]?.values || [];

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: "id", value: productId },
      type: `similars`,
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
    .map((id) => products.find((element: ProductTypes.Product) => element.productId === id))
    .filter(Boolean) as ProductTypes.Product[];

  const handleAddToCart = async (skuId: string) => {
    try {
      // Chama a API para obter informações do SKU
      const response = await fetch(`/api/catalog_system/pub/products/variations/${skuId}`);
      const data = await response.json();

      if (data?.skus?.length > 0) {
        // Seleciona o primeiro SKU disponível (ou algum específico)
        const sku = data.skus[0];

        // Adiciona o SKU ao carrinho
        addItem([{ id: sku.sku, quantity: 1, seller: '1' }]);
        console.log(`SKU ${sku.sku} adicionado ao carrinho`);
      }
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
    }
  };

  return (
    <>
      <div className={handles["similar__products-variants"]}>
        <p className={handles["similar__products-variants--title"]}>
          Cor: <span className={handles["variant-type"]}>{color}</span>
        </p>
        <div style={{ display: "flex" }} className={handles["similar__products-variants--wrap"]}>
          <div className={`${handles["similar__image-container"]} ${handles["similar__image-container--current"]}`}>
            <span
              className={handles["similar__products-variants--circle"]}
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: backgroundColor,
                display: "block",
              }}
            ></span>
          </div>
          {items.map((element: ProductTypes.Product, index: number) => {
            const bgColor =
              element?.items?.[0].variations?.[2]?.values?.[0] || "N/A";
            return (
              <div key={index} className={handles["similar__image-container"]}>
                <span
                  className={handles["similar__products-variants--circle"]}
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: bgColor,
                    display: "block",
                  }}
                ></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Renderização dos SKUs */}
      <div className="lambeeeeeeee">
        {skus.length > 0 ? (
          skus.map((sku: any, index: number) => (
            <span onClick={() => handleAddToCart(productId)} key={index}>
              {sku.name ? sku.name : `SKU #${index + 1}`}
            </span>
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

