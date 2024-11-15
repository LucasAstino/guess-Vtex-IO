import React, { FC, useState, useRef ,useEffect,useContext } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useCssHandles, CssHandlesTypes } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import { ToastContext } from "vtex.styleguide";
import { ToastContextType } from "vtex.styleguide";

interface CustomMinicartProps {
  openOnHover?: boolean;
  maxDrawerWidth?: number | string;
  MinicartIcon?: React.ComponentType;
  quantityDisplay?: "always" | "not-empty" | "never";
  itemCountMode?: "distinct" | "total";
  customPixelEventId?: string;
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>;
}

const CSS_HANDLES = [
  "minicartWrapper",
  "minicartButton",
  "minicartLink",
  "cartItems",
  "cartItem",
  "cartTitle",
  "cartSegure",
  "itemDetails",
  "minicartNumber",
  "minicartTotalizer",
  "minicartContainer",
  "cartHeader",
  "cartFooter",
  "checkoutButton",
  "cartButton",
  "minicartButtons",
  "emptyCartMessage",
  "minicart__product-img",
  "minicart__product-name",
  "minicart__product-un",
  "minicart__product-price",
  "cartSummaryContainer",
  "cartSummaryHeader",
  "cartIcon",
  "cartTitle",
  "cartSummaryContent",
  "productLoyaltyPoints",
  "pointsLabel",
  "pointsValue",
  "cutoffPointMsg",
  "creditLimitExceededMsg",
  "creditSummary",
  "creditSubtitle",
  "creditAvailableAmount",
  "creditUsedAmount",
  "creditSubtotalAmount",
  "cartSummaryFooter",
  "cartFooterIcon",
  "cartSubtotal",
  "subtotalLabel",
  "subtotalValue",
  "goToCart",
  "goToCheckout",
  "empty",
] as const;

export const CustomMinicart: FC<CustomMinicartProps> = ({
  quantityDisplay = "not-empty",
  openOnHover = false,
  classes,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES, { classes });
  const { orderForm } = useOrderForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isMobile } = useDevice();
  const timerRef = useRef<number | null>(null);
  const { showToast } = useContext(ToastContext) as ToastContextType;
  const [initialItemsCount, setInitialItemsCount] = useState<number | null>(null);


  const items = orderForm?.items ?? [];
  // const orderFormId = orderForm?.id;
  const totalItems = items.reduce(
    (acc: any, item: any) => acc + item.quantity,
    0
  );
  const totalPrice = items.reduce(
    (acc: any, item: any) => acc + item.sellingPrice,
    0
  );

  const openDrawer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    timerRef.current = window.setTimeout(() => {
      setIsDrawerOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (orderForm && orderForm.id !== 'default-order-form') {
      if (initialItemsCount === null) {
        setInitialItemsCount(totalItems)
      } else if (totalItems > initialItemsCount) {
        showToast({
          message: "Produto adicionado ao carrinho!",
          duration: 3000,
          action: {
            label: "Ver carrinho",
            href: "/checkout#/cart",
          },
        })
        setInitialItemsCount(totalItems)
      } else if (initialItemsCount === 0 && totalItems === 1) {
        showToast({
          message: "Produto adicionado ao carrinho!",
          duration: 3000,
          action: {
            label: "Ver carrinho",
            href: "/checkout#/cart",
          },
        })
        setInitialItemsCount(totalItems)
      }
    }
  }, [totalItems, initialItemsCount, orderForm, showToast])

  return (
    <div
      className={`${handles.minicartWrapper} ${openOnHover ? "hoverable" : ""}`}
      onMouseEnter={!isMobile ? openDrawer : undefined}
      onMouseLeave={!isMobile ? closeDrawer : undefined}
    >
      {isMobile ? (
        <a className={handles.minicartLink} href="/checkout#/cart">
          <button className={handles.minicartButton}>
            {quantityDisplay !== "never" && (
              <span className={handles.minicartNumber}>{totalItems}</span>
            )}
          </button>
        </a>
      ) : (
        <button className={handles.minicartButton}>
          {quantityDisplay !== "never" && (
            <span className={handles.minicartNumber}>{totalItems}</span>
          )}
        </button>
      )}

      {totalItems > 0
        ? isDrawerOpen && (
            <div
              className={`${handles.minicartContainer}`}
              onMouseEnter={openDrawer}
              onMouseLeave={closeDrawer}
            >
              <div className={handles.cartHeader}>
                <p className={handles.cartTitle}>Meu Carrinho</p>
                <p className={handles.cartSegure}>Compra 100% segura</p>
              </div>
              <div className={handles.cartItems}>
                {items.map((item: any, index: any) => (
                  <div key={index} className={handles.cartItem}>
                    <img
                      className={handles["minicart__product-img"]}
                      src={item.imageUrls.at1x}
                      alt={item.name}
                    />
                    <div className={handles.itemDetails}>
                      <p className={handles["minicart__product-name"]}>
                        {item.name}
                      </p>
                      <span className={handles["minicart__product-un"]}>
                        Valor un.
                      </span>
                      <span className={handles["minicart__product-price"]}>
                        R${(item.price / 100).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={handles.cartFooter}>
                <span className={handles.minicartTotalizer}>
                  Total a pagar: R${(totalPrice / 100).toFixed(2)}
                </span>
                <div className={handles.minicartButtons}>
                  <a href="/checkout#/cart" className={handles.cartButton}>
                    Carrinho
                  </a>
                  <a href="/checkout#/email" className={handles.checkoutButton}>
                    Finalizar compra
                  </a>
                </div>
              </div>
            </div>
          )
        : isDrawerOpen && (
            <div className={`${handles.minicartContainer} ${handles.empty}`}>
              <div className={handles.cartHeader}>
                <p className={handles.cartTitle}>Meu Carrinho</p>
                <p className={handles.cartSegure}>Compra 100% segura</p>
              </div>
              <div className={handles.cartFooter}>
                <div className={handles.emptyCartMessage}>
                  Que pena! Seu carrinho está vazio
                </div>
              </div>
            </div>
          )}
    </div>
  );
};
