import React, { FC, useEffect, useState } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import styles from "./AlertMessage.css"; // Certifique-se de criar e ajustar este CSS

export const AddToCartAlert: FC = () => {
  const { orderForm } = useOrderForm();
  const [prevOrderFormItems, setPrevOrderFormItems] = useState(orderForm?.items || []);
  const [alertVisible, setAlertVisible] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setPrevOrderFormItems(orderForm?.items || []);
      setInitialLoad(false);
      return;
    }

    if (orderForm?.items) {
      const itemAdded = orderForm.items.some((item :any, index :any) => {
        const prevItem = prevOrderFormItems[index];
        return !prevItem || item.quantity > prevItem.quantity;
      });

      if (itemAdded) {
        console.log('dsdsdasdasdasdasdassd')
        setAlertVisible(true);

        const timer = setTimeout(() => {
          setAlertVisible(false);
        }, 1000);

        return () => clearTimeout(timer);
      }

      setPrevOrderFormItems(orderForm.items);
    }
    return undefined
  }, [orderForm.items, initialLoad]);

  return (
    <div className={`${styles.alert} ${alertVisible ? styles.fadeIn : styles.fadeOut}`}>
      Produto adicionado ao carrinho!
    </div>
  );
  
};

