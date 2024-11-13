import React, { ReactNode } from 'react'
import { useProduct } from 'vtex.product-context'

interface GuideSizeProps {
  children: [ReactNode, ReactNode]
}

export const GuideSize: React.FC<GuideSizeProps> = ({ children }) => {
  const productContext = useProduct()

  if (!productContext?.product) {
    return null
  }

  const { product } = productContext
  const category = product.categoryTree?.[0]?.name.toLowerCase()

  return (
    <div className='vtex__guideSize'>
      {category === 'masculino' ? children[0] : children[1]}
    </div>
  )
}


