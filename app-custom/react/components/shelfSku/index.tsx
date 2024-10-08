import React from "react";
import type { ProductTypes } from "vtex.product-context";
import { useProduct } from "vtex.product-context";
import { useQuery } from "react-apollo";
import { useCssHandles } from "vtex.css-handles";
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

export function SkuFromShelf({
  productQuery,
}: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS);
  const product = useProduct();
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

  return (
    <>
      <div className={handles["similar__products-variants"]}>
        <p className={handles["similar__products-variants--title"]}>
          Cor: <span className={handles["variant-type"]}>{color}</span>
        </p>
        <div
          style={{ display: "flex" }}
          className={handles["similar__products-variants--wrap"]}
        >
          <div
            className={`${handles["similar__image-container"]} ${handles["similar__image-container--current"]}`}
          >
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
            <span key={index}>
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

// import React, { useState } from 'react'
// import type { ProductTypes } from 'vtex.product-context'
// import { useProduct } from 'vtex.product-context'
// import { useQuery, useApolloClient } from 'react-apollo' // Importa o useApolloClient
// import { useCssHandles } from 'vtex.css-handles'
// import productRecommendationsQuery from '../../queries/productRecommendations.gql'
// import skuQuery from '../../queries/skuQuery.gql' // Crie esta query para buscar os SKUs com base no productId

// export const HANDLES_VARIANTS = [
//   'similar__products-variants',
//   'similar__products-variants--title',
//   'variant-type',
//   'similar__products-variants--wrap',
//   'similar__products-variants--img-current',
//   'similar__products-variants--circle',
//   'similar__products-variants--link',
//   'similar__image-container',
//   'similar__image-container--current',
// ] as const

// interface SimilarProductsVariantsProps {
//   productQuery: {
//     product: {
//       productId: string
//     }
//   },
//   imageLabel?: string
// }

// export function SimilarProductsVariants({
//   productQuery,
// }: SimilarProductsVariantsProps) {
//   const { handles } = useCssHandles(HANDLES_VARIANTS)
//   const productContext = useProduct()
//   const [selectedSkus, setSelectedSkus] = useState<any[]>([]) // Armazena os SKUs do produto selecionado
//   const client = useApolloClient() // Usa o Apollo Client para fazer requisições

//   const productId =
//     productQuery?.product?.productId ?? productContext?.product?.productId

//   const { data, loading, error } = useQuery(productRecommendationsQuery, {
//     variables: {
//       identifier: { field: 'id', value: productId },
//       type: `similars`,
//     },
//     skip: !productId,
//   })

//   if (loading || error) return null

//   const { productRecommendations } = data
//   const products = productRecommendations || []

//   const handleProductClick = async (productId: string) => {
//     try {
//       const { data } = await client.query({
//         query: skuQuery,
//         variables: { productId }, // Consulta os SKUs pelo ID do produto similar
//       })
//       setSelectedSkus(data.skus) // Armazena os SKUs retornados
//     } catch (err) {
//       console.error('Erro ao buscar SKUs:', err)
//     }
//   }

//   return (
//     <div className={handles['similar__products-variants']}>
//       <p className={handles['similar__products-variants--title']}>
//         Produtos Similares:
//       </p>
//       <div style={{ display: 'flex' }} className={handles['similar__products-variants--wrap']}>
//         {products.map((element: ProductTypes.Product) => {
//           const backgroundColor = element?.items?.[0].variations?.[2]?.values?.[0] || 'N/A'
//           return (
//             <div
//               key={element.productId}
//               className={handles['similar__products-variants--link']}
//               onClick={() => handleProductClick(element.productId)} // Captura o clique e busca os SKUs
//             >
//               <div className={handles['similar__image-container']}>
//                 <span
//                   className={handles['similar__products-variants--circle']}
//                   style={{ height: '20px', width: '20px', backgroundColor, display: 'block' }}
//                 ></span>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Mostra os SKUs do produto clicado */}
//       {selectedSkus.length > 0 && (
//         <div>
//           <h3>SKUs do Produto Selecionado:</h3>
//           <ul>
//             {selectedSkus.map(sku => (
//               <li key={sku.itemId}>{sku.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }

// SimilarProductsVariants.schema = {
//   title: 'SimilarProducts Variants',
//   description: 'SimilarProducts Variants',
//   type: 'object',
//   properties: {},
// }
