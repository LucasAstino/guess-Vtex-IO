import React, { useEffect } from "react";

interface Props {
  targetSelector: string; // CSS selector do elemento ao lado do qual o botão aparecerá
  triggerSelector: string; // CSS selector do elemento que será clicado
}

export const CustomButtonTrigger: React.FC<Props> = ({
  targetSelector,
  triggerSelector,
}) => {
  useEffect(() => {
    console.log("filter check");

    const targetElement = document.querySelector(".vtex-search-result-3-x-filterBreadcrumbsContent");

    if (targetElement) {
      // Verifica se o botão já existe
      const existingButton = document.querySelector("#custom-trigger-button");
      
      if (!existingButton) {
        // Cria o botão
        const button = document.createElement("button");
        button.classList.add('vtex__close-filter'); 
        button.textContent = "+";

        // Define o estilo do botão
        button.style.marginLeft = "10px"; // Ajuste conforme necessário

        // Define a ação do botão para clicar no outro elemento
        button.addEventListener("click", () => {
          const otherElement = document.querySelector(
            ".vtex-search-result-3-x-sidebar"
          ) as HTMLElement;
          const siblingElement = otherElement.previousElementSibling as HTMLElement;
          console.log(siblingElement,"aaaaaaaaaaaaaaaaaaaaaaaaa")
          if (siblingElement) {
            siblingElement.click(); // Dispara o clique no outro elemento
          } else {
            console.warn("Outro elemento não encontrado!");
          }
        });

        // Adiciona o botão ao lado do elemento selecionado
        targetElement.parentNode?.insertBefore(button, targetElement.nextSibling);
      }
    } else {
      console.warn("Elemento alvo não encontrado!");
    }
  }, [targetSelector, triggerSelector]);

  return null;
};
