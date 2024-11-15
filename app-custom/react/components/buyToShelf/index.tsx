import React, { FC } from "react";
import { useProduct } from "vtex.product-context"; 
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";


export const HANDLES_VIEWED = [
  "product-wrapper",
] as const;

export const BuyToShelf: FC = () => {
  const productContext = useProduct() as any;
  const { handles } = useCssHandles(HANDLES_VIEWED);
  

  if (!productContext || !productContext.product) {
    return null;
  }

  const product = productContext.product;

  return (
    <div className={handles["product-wrapper"]}>
      <SkuFromShelf productQuery={{ product }} />
    </div>
  );
};

export default BuyToShelf;
