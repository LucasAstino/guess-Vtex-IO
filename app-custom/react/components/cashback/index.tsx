import React from "react";
import { useProduct } from "vtex.product-context";

export const ProductCashbackDisplay: React.FC = () => {
  const product = useProduct();

  // Pega o preço de venda do produto
  const sellingPrice = product?.selectedItem?.sellers[0].commertialOffer.Price;

  // Calcula 30% do preço de venda
  const cashbackAmount = sellingPrice ? sellingPrice * 0.3 : 0;

  // Formata o valor de cashback em reais
  const cashbackFormatted = cashbackAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--cashback__pdp flex tl items-start justify-start t-body c-on-base">
      <div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--cashback__pdp">
        <p className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--cashback__pdp">
          Compre e acumule bônus de <span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--cashback__pdp">{cashbackFormatted}</span>
        </p>
      </div>
    </div>
  );
};
