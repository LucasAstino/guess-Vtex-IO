import React, { FC, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'


interface CustomMinicartProps {
  openOnHover?: boolean
  maxDrawerWidth?: number | string
  MinicartIcon?: React.ComponentType
  quantityDisplay?: 'always' | 'not-empty' | 'never'
  itemCountMode?: 'distinct' | 'total'
  customPixelEventId?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const CSS_HANDLES = [
  'minicartWrapper',
  'minicartButton',
  'cartItems',
  'cartItem',
  'cartTitle',
  'cartSegure',
  'itemDetails',
  'minicartNumber',
  'minicartTotalizer',
  'minicartContainer',
  'cartHeader',
  'cartFooter',
  'checkoutButton',
  'cartButton',
  'minicartButtons',
  'emptyCartMessage',
  'minicart__product-img',
  'minicart__product-name',
  'minicart__product-un',
  'minicart__product-price',
] as const

export const CustomMinicart: FC<CustomMinicartProps> = ({
  quantityDisplay = 'not-empty',
  openOnHover = false,
  classes,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { orderForm } = useOrderForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const items = orderForm?.items ?? []
  const totalItems = items.reduce((acc: any, item: any) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc: any, item: any) => acc + item.sellingPrice, 0)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div
      className={`${handles.minicartWrapper} ${openOnHover ? 'hoverable' : ''}`}
      onMouseEnter={openDrawer}
      onMouseLeave={closeDrawer} // Adiciona controle para fechar ao sair do minicart
    >
      <button className={handles.minicartButton}>
        {quantityDisplay !== 'never' && <span className={handles.minicartNumber}>{totalItems}</span>}
      </button>

      {totalItems > 0 ? (
        isDrawerOpen && (
          <div
            className={`${handles.minicartContainer}`}
          >
            <div className={handles.cartHeader}>
              <p className={handles.cartTitle}>Meu Carrinho</p>
              <p className={handles.cartSegure}>Compra 100% segura</p>
            </div>
            <div className={handles.cartItems}>
              {items.length > 0 ? (
                items.map((item: any, index: any) => (
                  <div key={index} className={handles.cartItem}>
                    <img className={handles['minicart__product-img']} src={item.imageUrls.at1x} alt={item.name} />
                    <div className={handles.itemDetails}>
                      <p className={handles['minicart__product-name']}>{item.name}</p>
                      <span className={handles['minicart__product-un']}>Valor un.</span>
                      <span className={handles['minicart__product-price']}>R${(item.price / 100).toFixed(2).replace('.',',')}</span>
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
                <span className={handles.minicartTotalizer}>Total a pagar: R${(totalPrice / 100).toFixed(2)}</span>
                <div className={handles.minicartButtons} >
                  <a className={handles.cartButton}>Carrinho</a>
                  <a className={handles.checkoutButton}>Finalizar compra</a>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="summaryheader-content wd-widget">
          <div className="wd-header">
            <span className="wd-icon"></span>
            <div className="wd-title">Meu carrinho</div>
          </div>
          <div className="wd-content">
            <ul className="loyalty-total-of-product-points" style={{ display: 'none' }}>
              <li className="label">Total de pontos</li>
              <li className="value">
                <small>0</small>
                <small> pontos</small>
              </li>
            </ul>
            <span style={{ display: 'none' }} className="cutoffpoint-reached-msg">
              Você está no ponto de corte. <a href="#">Saiba mais.</a>
            </span>
            <span style={{ display: 'none' }} className="creditcompetence-exceeded-msg">
              Você excedeu o limite de compra
            </span>
            <ul className="creditcompetence-summary" style={{ display: 'none' }}>
              <li className="subtitle">Seus Créditos</li>
              <li className="content available-amount">
                <span className="label">Você possui</span>
                <span className="value">R$ 0,00</span>
              </li>
              <li className="content used">
                <span className="label">Serão usados</span>
                <span className="value">R$ 0,00</span>
              </li>
              <li className="content subtotal-amount">
                <span className="label">Seu saldo será</span>
                <span className="value">R$ 0,00</span>
              </li>
            </ul>
          </div>
          <div className="wd-footer">
            <span className="wd-icon"></span>
            <ul className="subtotal">
              <li className="label">Total a pagar</li>
              <li className="value">R$ 0,00</li>
            </ul>
            <button className="go-to-basket" title="Carrinho">
              Carrinho
            </button>
            <button className="go-to-checkout" title="Finalizar compra" style={{ display: 'none' }}>
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
