// import { useEffect } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";

// Definindo o tipo de Item dentro do OrderForm
// interface OrderItem {
//   id: string;
//   variation?: {
//     size?: string; // ou outro campo específico para o tamanho
//   };
// }

export const GetItemVariation = () => {
  const { orderForm } = useOrderForm();

  console.log(orderForm, "orderForm")
};
