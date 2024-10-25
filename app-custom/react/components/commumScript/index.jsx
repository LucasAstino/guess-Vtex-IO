import React, { useEffect } from "react";
import { useRuntime } from "vtex.render-runtime";

export const CommumScript = () => {
  const { page, route } = useRuntime();

  useEffect(() => {
    console.log("kkkkkkkkkkkkkkkkk");
    if (page.includes("store.home")) {
    }

    if (page.includes("store.product")) {
      const input = document.querySelector(".vtex-address-form-4-x-input");
      if(input){
        input.setAttribute("placeholder", "Insira seu CEP");
      }
    }

    const isProductListPage = [
      "store.search",
      "store.search#category",
      "store.search#department",
    ].includes(route.routeId);

    if (isProductListPage) {
      
      const filter = document.querySelector(
        ".vtex-disclosure-layout-1-x-trigger--filter"
      );

      filter.addEventListener("click", () => {

        const gallery = document.querySelector('.vtex-search-result-3-x-gallery--grid')
        gallery.classList.toggle('vtex__gallery--grid-4')

        const hexa = document.querySelector(
          ".vtex-search-result-3-x-filter__container--hexadecimal .vtex-search-result-3-x-filterAvailable"
        )
        hexa.click()
        console.log(
          document.querySelector(
            ".vtex-search-result-3-x-filter__container--hexadecimal"
          )
        );
      });
    }

    // return () => {
    //   const scripts = document.querySelectorAll('script[src*="exemplo.com"]')
    //   scripts.forEach(script => script.remove())
    // }
  }, [page]);

  return null;
};
