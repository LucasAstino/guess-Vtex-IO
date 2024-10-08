import React from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

export const HANDLES_VARIANTS = [
  'similar__products-variants',
  'similar__products-variants--title',
  'variant-type',
  'similar__products-variants--wrap',
  'similar__products-variants--img-current',
  'similar__products-variants--circle',
  'similar__products-variants--link',
  'similar__image-container',
  'similar__image-container--current',
] as const

import productRecommendationsQuery from '../../queries/productRecommendations.gql'

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string
    }
  },
  imageLabel?: string
}

export function SimilarProductsVariants({
  productQuery,
  // imageLabel
}: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS)
  const product = useProduct()
  // const productCurrentImg = product?.selectedItem?.images[0].imageUrl
  // const productCurrentImgAlt = product?.selectedItem?.images[0].imageText
  const color = product?.selectedItem?.variations?.[1]?.values?.[0] || 'N/A'
   const backgroundColor = product?.selectedItem?.variations?.[2]?.values?.[0] || 'N/A'
  const productContext = useProduct()
  // const { route } = useRuntime()
  console.log(productQuery)
  const productId =
    productQuery?.product?.productId ?? productContext?.product?.productId

    console.log(productId)
  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: 'id', value: productId },
      type: `similars`,
    },
    skip: !productId,
  })

  if (loading || error) return null

  const { productRecommendations } = data

  const { products } = {
    products: productRecommendations || [],
  }

  const unique = [
    ...new Set<string>(
      products.map((item: ProductTypes.Product) => item.productId)
    ),
  ]

  const items: ProductTypes.Product[] = []

  unique.forEach(id => {
    const item = products.find(
      (element: ProductTypes.Product) => element.productId === id
    )

    if (item) items.push(item)
  })

  if (items.length === 0) {
   
    return (
      <div className={handles['similar__products-variants']}>
        <p className={handles['similar__products-variants--title']}>
          Cor: <span className={handles['variant-type']}>{color}</span>
        </p>
        <div style={{display:'flex'}} className={handles['similar__products-variants--wrap']}>
          <div className={`${handles['similar__image-container']} ${handles['similar__image-container--current']}`}>
            <span className={handles['similar__products-variants--circle']} style={{height:'20px',width:'20px',backgroundColor:backgroundColor,display:'block'}}></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={handles['similar__products-variants']}>
      <p className={handles['similar__products-variants--title']}>
        Cor: <span className={handles['variant-type']}>{color}</span>
      </p>
      <div style={{display:'flex'}} className={handles['similar__products-variants--wrap']}>
        <div className={`${handles['similar__image-container']} ${handles['similar__image-container--current']}`}>
        <span className={handles['similar__products-variants--circle']} style={{height:'20px',width:'20px',backgroundColor:backgroundColor,display:'block'}}></span>
        </div>
        {items.map((element: ProductTypes.Product) => {
          // const imageIndex = imageLabel === undefined
          //   ? 0
          //   : element.items[0].images.findIndex(image => image.imageLabel === imageLabel) === -1
          //     ? 0
          //     : element.items[0].images.findIndex(image => image.imageLabel === imageLabel)

          // const srcImage = element.items[0].images[imageIndex].imageUrl
          const backgroundColor = element?.items?.[0].variations?.[2]?.values?.[0] || 'N/A'
          return (
            <Link
              key={element.productId}
              className={`${handles['similar__products-variants--link']} `}
              page="store.product"
              params={{
                slug: element?.linkText,
                id: element?.productId,
              }}
            >
              <div className={handles['similar__image-container']}>
              <span className={handles['similar__products-variants--circle']} style={{height:'20px',width:'20px',backgroundColor:backgroundColor,display:'block'}}></span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

SimilarProductsVariants.schema = {
  title: 'SimilarProducts Variants',
  description: 'SimilarProducts Variants',
  type: 'object',
  properties: {},
}
