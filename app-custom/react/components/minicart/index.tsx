import React, { FC, useCallback, useState } from 'react'
// import { IconCart } from 'vtex.store-icons'
// import { BackdropMode } from 'vtex.store-drawer'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import { ResponsiveValuesTypes } from 'vtex.responsive-values'
// import { useCheckoutURL } from 'vtex.checkout-resources/Utils'
// import { PixelEventTypes } from 'vtex.pixel-manager'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import styles from './minicartCustom.css'

interface CustomMinicartProps {
  openOnHover?: boolean
  maxDrawerWidth?: number | string
  MinicartIcon?: React.ComponentType
  drawerSlideDirection?: 'leftToRight' | 'rightToLeft'
  quantityDisplay?: 'always' | 'not-empty' | 'never'
  itemCountMode?: 'distinct' | 'total'
  customPixelEventId?: string
  // customPixelEventName?: PixelEventTypes.EventName
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const CSS_HANDLES = [
  'minicartWrapper',
  'minicartContainer',
  'cartHeader',
  'cartFooter',
  'checkoutButton',
  'emptyCartMessage',
] as const

export const CustomMinicart: FC<CustomMinicartProps> = ({
  maxDrawerWidth = 400,
  // MinicartIcon = IconCart,
  quantityDisplay = 'not-empty',
  // itemCountMode = 'distinct',
  // drawerSlideDirection = 'rightToLeft',
  // customPixelEventId,
  // customPixelEventName,
  openOnHover = false,
  classes,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { orderForm } = useOrderForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const items = orderForm?.items ?? []
  const totalItems = items.reduce((acc:any, item:any) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc:any, item:any) => acc + item.sellingPrice, 0)

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prev => !prev)
  }, [])

  const handleRemoveItem = async (index: number) => {
    // Lógica para remover item do carrinho (implementação usando orderFormMutation pode ser adicionada)
    console.log(`Remover item na posição ${index}`)
  }

  return (
    <div className={`${handles.minicartWrapper} ${openOnHover ? 'hoverable' : ''}`}>
      <button onClick={toggleDrawer} className={styles.cartButton}>
        {quantityDisplay !== 'never' && <span>{totalItems}</span>}
      </button>

      {isDrawerOpen && (
        <div
          className={`${handles.minicartContainer}`}
          style={{ maxWidth: maxDrawerWidth }}
        >
          <div className={styles.cartHeader}>
            <h3>Meu Carrinho ({totalItems} itens)</h3>
            <button onClick={toggleDrawer}>Fechar</button>
          </div>
          <div className={styles.cartItems}>
            {items.length > 0 ? (
              items.map((item : any, index :any) => (
                <div key={index} className={styles.cartItem}>
                  <img src={item.imageUrls.at1x} alt={item.name} />
                  <div className={styles.itemDetails}>
                    <span>{item.name}</span>
                    <span>Quantidade: {item.quantity}</span>
                    <span>Preço: R${(item.price / 100).toFixed(2)}</span>
                    <button onClick={() => handleRemoveItem(index)}>Remover</button>
                  </div>
                </div>
              ))
            ) : (
              <div className={handles.emptyCartMessage}>
                Seu carrinho está vazio
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className={handles.cartFooter}>
              <div>Total: R${(totalPrice / 100).toFixed(2)}</div>
              <a href="">
                <button className={handles.checkoutButton}>Finalizar Compra</button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

