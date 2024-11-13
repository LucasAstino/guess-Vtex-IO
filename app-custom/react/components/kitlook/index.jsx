import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import KitLook from '../../queries/kitLook.gql'
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from "vtex.css-handles";

export const KITLOOK = [
 "kitLook__container",
 "kitLook__title",
 "kitLook__item",
 "kitLook__item-image",
 "kitLook__item-link",
 "kitLook__item-name",
]


export const KitLookComponent = () => {
  const productContext = useProduct()
  const { handles } = useCssHandles(KITLOOK);
  console.log("productContext:", productContext)
  
  const id = productContext?.product?.properties[4]?.values[0]
  console.log("Product ID:", id)

  const { data, loading, error } = useQuery(KitLook, {
    variables: {
      identifier: { field: "id", value: id },
    },
    skip: !id,
  })

  console.log("Loading state:", loading)
  console.log("Error state:", error)
  console.log("Data fetched:", data)

  useEffect(() => {
    console.log("Component mounted or data updated")
  }, [data])

  if (loading) {
    console.log("Component is loading data")
    return <p>Carregando...</p>
  }

  if (error) {
    console.log("An error occurred while fetching data")
    return <p>Erro ao carregar dados do SKU</p>
  }

  const kitItems = data?.product ? [].concat(data.product) : []


  return (
    <div className={handles['kitLook__container']}>
      <p className={handles['kitLook__title']} >Complete o look</p>
      
        <SliderLayout
          itemsPerPage={{
            desktop: 2,
            tablet: 2,
            phone: 1,
          }}
          showNavigationArrows="never"
          showPaginationDots="never"
        >
          {kitItems.map((item, index) => (
            <div className={handles.kitLook__item} key={index}>
            {console.log("Rendering item:", item)}
              <a className={handles['kitLook__item-link']} href={`\\${item.linkText}/p`}>
                <img className={handles['kitLook__item-image']} src={item?.items[0]?.images[0]?.imageUrl} alt={item.productName}/>
                <p className={handles['kitLook__item-name']}>{item.productName}</p>
              </a>
            </div>
          ))}
        </SliderLayout>
    </div>
  )
}
