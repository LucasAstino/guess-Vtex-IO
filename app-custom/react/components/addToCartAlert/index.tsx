import React, { useEffect, useRef, useState } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useCssHandles } from "vtex.css-handles";
import ReactDOM from "react-dom";

const CSS_ALERT = ["alertadd__container", "alert__container-text"] as const;

export const AddToCartAlert = () => {
  const { orderForm } = useOrderForm();
  const prevItemsCount = useRef(orderForm.items.length);
  const [showMessage, setShowMessage] = useState(false);
  const { handles } = useCssHandles(CSS_ALERT);

  useEffect(() => {
    // Seleciona o botão de adicionar ao carrinho pelo seletor específico
    const addToCartButton = document.querySelector(
      ".vtex-flex-layout-0-x-flexRowContent--buy-button .vtex-button"
    );

    // Define o manipulador de clique com atraso
    const handleButtonClick = () => {
      setTimeout(() => {
        // Verifica se o número de itens aumentou após 1 segundo do clique
        if (orderForm.items.length > prevItemsCount.current) {
          setShowMessage(true); // Exibe a mensagem
          setTimeout(() => setShowMessage(true), 3000); // Oculta a mensagem após 3 segundos
        }
        // Atualiza o número de itens para a próxima verificação
        prevItemsCount.current = orderForm.items.length;
      }, 1000); // Atraso de 1 segundo
    };

    // Adiciona o evento de clique ao botão, se ele existir
    if (addToCartButton) {
      addToCartButton.addEventListener("click", handleButtonClick);
    }

    // Limpa o evento ao desmontar o componente para evitar vazamento de memória
    return () => {
      if (addToCartButton) {
        addToCartButton.removeEventListener("click", handleButtonClick);
      }
    };
  }, [orderForm.items.length]);

  // Função para renderizar o conteúdo do modal
  const ModalContent = () => (
    <div
      className={handles.alertadd__container}
      style={{
        zIndex: 1000, // Garantindo que fique sobre todos os elementos
      }}
    >
      <div className={handles["alert__container-text"]}>
        Produto adicionado ao carrinho com sucesso!
      </div>
    </div>
  );

  // Usa ReactDOM.createPortal para renderizar o modal no body
  return showMessage
    ? ReactDOM.createPortal(<ModalContent />, document.body)
    : null;
};
