import React, { useEffect } from "react";

interface ICategoryValidator {
  children: React.ReactNode;
}

const CategoryValidator = ({ children }: ICategoryValidator) => {
  useEffect(() => {
    const validPaths = [
      '/bolsas',
      '/feminino',
      '/masculino',
      '/feminino/roupas/camisetas',
      '/feminino/roupas/blusas',
      '/masculino/roupas/camisetas',
      '/sale',
    ];

    if (validPaths.includes(window.location.pathname)) {
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
