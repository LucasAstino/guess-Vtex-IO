import React, { useEffect } from "react";
import { useRuntime } from "vtex.render-runtime";

export const CommumScript = () => {
  const { page, route } = useRuntime();
  const isProductListPage = [
    "store.search",
    "store.search#category",
    "store.search#department",
  ].includes(route.routeId);

  useEffect(() => {
    if (page.includes("store.home")) {
    }

    if (page.includes("store.product")) {
      const input = document.querySelector(".vtex-address-form-4-x-input");
      if (input) {
        input.setAttribute("placeholder", "Insira seu CEP");
      }
    }

    if (isProductListPage) {
      const filter = document.querySelector(
        ".vtex-disclosure-layout-1-x-trigger--filter"
      );

      filter.addEventListener("click", () => {
        const gallery = document.querySelector(
          ".vtex-search-result-3-x-gallery--grid"
        );
        gallery.classList.toggle("vtex__gallery--grid-4");

        const hexa = document.querySelector(
          ".vtex-search-result-3-x-filter__container--hexadecimal .vtex-search-result-3-x-filterAvailable"
        );
        hexa.click();
        setTimeout(() => {
          const codesHexa = document.querySelectorAll(
            ".vtex-search-result-3-x-filter__container--hexadecimal .vtex-search-result-3-x-filterItem"
          );
          const colors = document.querySelectorAll(
            ".vtex-search-result-3-x-filter__container--cor .vtex-search-result-3-x-filterItem"
          );
        
          // Verifica se os arrays têm o mesmo comprimento para evitar erros
          if (codesHexa.length === colors.length) {
            codesHexa.forEach((hexaElement, index) => {
              const hexAlt = hexaElement.getAttribute('alt');
              // Define o alt do elemento correspondente de cor
              colors[index].setAttribute('alt', hexAlt);
            });
          } else {
            console.warn("A quantidade de itens em codesHexa e colors não é a mesma.");
          }
        }, 1000);
        
      });
    }

    // return () => {
    //   const scripts = document.querySelectorAll('script[src*="exemplo.com"]')
    //   scripts.forEach(script => script.remove())
    // }
  }, [page]);

  return null;
};
