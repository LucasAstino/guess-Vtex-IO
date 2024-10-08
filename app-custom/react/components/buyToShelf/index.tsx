import React, { FC } from 'react';
import { useProduct } from 'vtex.product-context';
import { SimilarProductsVariants } from '../product-variants'; // Importa o componente SimilarProductsVariants

interface Product {
  productId: string;
  productName: string;
  linkText: string;
  items: {
    itemId: string;
    name: string;
    variations: { [key: string]: string[] }; // Ex: { "Color": ["Red", "Blue"] }
    images: { imageUrl: string }[];
  }[];
}

type Props = {
  children: React.ReactNode; // Define o tipo de children
};

export const BuyToShelf: FC<Props> = ({ children }) => {
  const productContext = useProduct();

  const product = productContext?.product as unknown as Product; // Converte o tipo para Product

  return (
    <>
      {product ? (
        <SimilarProductsVariants productQuery={{ product }} />
      ) : (
        <p>Produto não encontrado</p>
      )}
      {children}
    </>
  );
};


