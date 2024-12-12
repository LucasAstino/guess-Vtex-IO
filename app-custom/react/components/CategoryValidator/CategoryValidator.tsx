import React, { useEffect } from "react";

interface ICategoryValidator {
  children: React.ReactNode;
}

const CategoryValidator = ({ children }: ICategoryValidator) => {
  useEffect(() => {
    if (window.location.pathname === '/bolsas') {
      const container = document.querySelector('.vtex-search-result-3-x-orderByOptionsContainer');
      const orderByOptionItems = Array.from(document.querySelectorAll('.vtex-search-result-3-x-orderByOptionItem'));

      const maisRecentes = orderByOptionItems.find(item => item.textContent?.trim() === 'Mais recentes');

      if (container && maisRecentes) {
        container.removeChild(maisRecentes);
        container.insertBefore(maisRecentes, container.firstChild);
      }
    }
  }, []);

  return <>{children}</>;
};

export default CategoryValidator;
