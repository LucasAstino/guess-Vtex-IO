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


import React, { useState } from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import productRecommendationsQuery from '../../queries/productRecommendations.gql'

export const HANDLES_VARIANTS = [
  'similar__products-variants',
  'similar__products-variants--title',
  'variant-type',
  'similar__products-variants--wrap',
  'similar__products-variants--img-current',
  'similar__products-variants--circle',
  'similar__products-variants--circle-unavailable',
  'similar__products-variants--link',
  'similar__image-container',
  'similar__image-container--current',
] as const

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
      productId: string
      skuSpecifications?: SkuSpecification[];
    }
  },
  imageLabel?: string
}

export function SkuFromShelf({ productQuery }: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS);
  const product = useProduct();
  const { addItem } = useOrderItems();
  const [skusTamanho, setSkusTamanho] = useState<ProductTypes.Item[]>([]); // Armazena os SKUs de tamanho
  // const currentColor = productQuery.product.skuSpecifications?.[2].values[0].name

  console.log(productQuery.product.skuSpecifications?.[2].values[0].name)

  const color = product?.selectedItem?.variations?.[1]?.values?.[0] || 'N/A';
  const backgroundColor =
  productQuery.product.skuSpecifications?.[2].values[0].name
  const productId =
    productQuery?.product?.productId ?? product?.product?.productId;

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: 'id', value: productId },
      type: 'similars',
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

  // Função para buscar os SKUs do produto selecionado
  const fetchSkusByColor = async (colorProductId: string) => {
    try {
      const response = await fetch(`/api/catalog_system/pub/products/variations/${colorProductId}`);
      const data = await response.json();
      console.log(data, "dataaaaaaa");
      if (Array.isArray(data.skus)) { // Verifica se é um array
        console.log(data.skus, "skus");
        setSkusTamanho(data.skus); // Atualiza os SKUs com os da nova cor
      }
    } catch (error) {
      console.error('Erro ao buscar SKUs:', error);
    }
  };

  const handleColorClick = (colorProductId: string) => {
    fetchSkusByColor(colorProductId); // Faz a requisição para buscar SKUs da nova cor
  };

  // Adiciona o SKU ao carrinho
  const handleAddToCart = (skuId: string) => {
    const itemToAdd = {
      id: skuId,
      quantity: 1,
      seller: '1',
    };
    addItem([itemToAdd]);
  };

  return (
    <>
      <div className={handles['similar__products-variants']}>
        <p className={handles['similar__products-variants--title']}>
          Cor: <span className={handles['variant-type']}>{color}</span>
        </p>
        <div style={{ display: 'flex' }} className={handles['similar__products-variants--wrap']}>
          <div className={`${handles['similar__image-container']} ${handles['similar__image-container--current']}`}>
            <span
              className={handles['similar__products-variants--circle']}
              style={{
                height: '20px',
                width: '20px',
                backgroundColor: backgroundColor,
                display: 'block',
              }}
            />
          </div>
          {items.map((element: ProductTypes.Product, index: number) => {
            const bgColor =
              element?.items?.[0].variations?.[2]?.values?.[0] || 'N/A';
              console.log(skusTamanho,"uiiiiiiiiiiiiiiiiiiii")

            return (
              <div key={index} className={handles['similar__image-container']}>
                <span 
                  data-color={element.productId}
                  className={  handles['similar__products-variants--circle']}
                  style={{
                    height: '20px',
                    width: '20px',
                    backgroundColor: bgColor,
                    display: 'block',
                  }}
                  onClick={() => handleColorClick(element.productId)} // Adiciona a função de clique
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Renderização dos SKUs */}
      <div>
        {console.log(skusTamanho, "state")}
        {skusTamanho.length > 0 ? (
          skusTamanho.map((sku: any, index: number) => (
            <span data-vai={sku.sku} onClick={() => handleAddToCart(sku.sku)} key={index}>
              {sku.name || `SKU #${index + 1}`}
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




