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
