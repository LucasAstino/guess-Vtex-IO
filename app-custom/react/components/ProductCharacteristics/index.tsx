import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

export const HANDLES_CSS = [
  'composition__paragraph'
] as const

export function ProductCharacteristics() {
  const product = useProduct()
  const compositionProperty = product?.product?.properties?.find(prop => prop.name?.toLowerCase() === "composição");
  const composition = compositionProperty ? compositionProperty.values?.[0] : null;

  const reference = product?.product?.productReference
  const handles = useCssHandles(HANDLES_CSS)
  return (
    <>
      <p className={handles.handles.composition__paragraph} >Composição: {composition}</p>
      <p className={handles.handles.composition__paragraph} >Referência: {reference}</p>
    </>
  )
}
