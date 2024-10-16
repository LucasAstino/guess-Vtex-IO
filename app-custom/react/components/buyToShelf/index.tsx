// import React, { FC } from 'react';
// import { useProduct } from 'vtex.product-context';
// import { SimilarProductsVariants } from '../product-variants'; // Importa o componente SimilarProductsVariants

// interface Product {
//   productId: string;
//   productName: string;
//   linkText: string;
//   items: {
//     itemId: string;
//     name: string;
//     variations: { [key: string]: string[] }; // Ex: { "Color": ["Red", "Blue"] }
//     images: { imageUrl: string }[];
//   }[];
// }

// type Props = {
//   children: React.ReactNode; // Define o tipo de children
// };

// export const BuyToShelf: FC<Props> = ({ children }) => {
//   const productContext = useProduct();

//   const product = productContext?.product as unknown as Product; // Converte o tipo para Product

//   return (
//     <>
//       {product ? (
//         <SimilarProductsVariants productQuery={{ product }} />
//       ) : (
//         <p>Produto não encontrado</p>
//       )}
//       {children}
//     </>
//   );
// };

// import React, { FC, useState } from "react";
// import { useProduct } from "vtex.product-context"; // Importa o contexto correto
// import { SkuFromShelf } from "../shelfSku";
// import { useCssHandles } from "vtex.css-handles";

// // Definição das classes CSS
// export const HANDLES_VIEWED = [
//   "product-wrapper",
//   "product-name",
//   "product-link",
//   "product-price",
//   "product-installments",
//   "product-addtocart",
//   "modal",
//   "modalOverlay",
//   "modalContent",
//   "modalContent__alert-visible",
//   "modalContent__alert-hidden",
//   "closeButton",
// ] as const;

// export const BuyToShelf: FC = () => {
//   // Pega o contexto do produto diretamente, com tipagem correta
//   const productContext = useProduct() as   any; 
//   const { handles } = useCssHandles(HANDLES_VIEWED);
//   const [isModalOpen, setModalOpen] = useState(false);

//   // Verifica se há produto no contexto antes de renderizar
//   if (!productContext || !productContext.product) {
//     return null;
//   }

//   const product = productContext.product;
//   const item = product.items[0];
//   const seller = item.sellers[0];

//   // Formata a imagem e o preço
//   const image = item.images[0].imageUrl.replace(/(ids\/\d+)/, "$1-500-610");
//   const price = seller.commertialOffer.PriceWithoutDiscount.toLocaleString(
//     "pt-BR",
//     { minimumFractionDigits: 2, maximumFractionDigits: 2 }
//   );

//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   return (
//     <div className={handles["product-wrapper"]}>
//       <a href={`/${product.linkText}/p`} className={handles["product-link"]}>
//         <img src={image} alt={product.productName} />
//         <h3 className={handles["product-name"]}>{product.productName}</h3>
//       </a>
//       <p className={handles["product-price"]}>R$ {price}</p>
//       <button className={handles["product-addtocart"]} onClick={handleOpenModal}>
//         Ver mais detalhes
//       </button>

//       {isModalOpen && (
//         <div className={handles.modalOverlay}>
//           <div className={handles.modalContent}>
//             <button className={handles.closeButton} onClick={handleCloseModal}>
//               X
//             </button>
//             {/* Passa as informações do produto atual para o componente SkuFromShelf */}
//             <SkuFromShelf productQuery={{ product }} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { FC } from "react";
import { useProduct } from "vtex.product-context"; // Importa o contexto correto
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";


// Definição das classes CSS
export const HANDLES_VIEWED = [
  "product-wrapper",
] as const;

export const BuyToShelf: FC = () => {
  // Pega o contexto do produto diretamente, com tipagem correta
  const productContext = useProduct() as any;
  const { handles } = useCssHandles(HANDLES_VIEWED);
  

  // Verifica se há produto no contexto antes de renderizar
  if (!productContext || !productContext.product) {
    return null;
  }

  const product = productContext.product;

  return (
    <div className={handles["product-wrapper"]}>
      {/* Passa as informações do produto atual para o componente SkuFromShelf */}
      <SkuFromShelf productQuery={{ product }} />
    </div>
  );
};

export default BuyToShelf;
