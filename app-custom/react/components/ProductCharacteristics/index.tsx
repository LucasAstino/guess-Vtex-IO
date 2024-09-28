import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

export const HANDLES_CSS = [
  'composition__paragraph'
] as const

export function ProductCharacteristics(){
    const product = useProduct()
    const composition = product?.product?.properties?.[0].values?.[0]
    const reference = product?.product?.productReference
    console.log(composition)
    const handles = useCssHandles(HANDLES_CSS)
    return(
      <>
        <p className={handles.handles.composition__paragraph} >Composição: {composition}</p>
        <p className={handles.handles.composition__paragraph} >Referência: {reference}</p>
      </>
    )
}
