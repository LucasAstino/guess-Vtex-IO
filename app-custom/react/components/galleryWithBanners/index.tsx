import React, { useEffect } from 'react'
interface GalleryWithBannersProps {
  images?: { imageUrl: string; link?: string; enabled?: boolean }[]
}

const GalleryWithBanners: React.FC<GalleryWithBannersProps> & {
  getSchema?: () => object
} = ({ images = [] }) => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const indices = isMobile ? [0, 4, 6, 10] : [0, 3, 6, 9]
    const maxWidth = isMobile ? '47%' : '25%'

    const injectBanners = () => {
      const galleryItems = document.querySelectorAll<HTMLElement>(
        '.vtex-search-result-3-x-galleryItem--grid-banners-laterais'
      )

      indices.forEach((index, i) => {
        const targetItem = galleryItems[index]
        const imageData = images[i]

        // Só injeta se estiver ativado
        if (
          targetItem &&
          targetItem.parentNode &&
          imageData?.enabled !== false &&
          !targetItem.previousElementSibling?.classList?.contains('aviso-banner-injetado')
        ) {
          const avisoDiv = document.createElement('div')
          avisoDiv.className = 'aviso-banner-injetado'
          avisoDiv.style.maxWidth = maxWidth

          const img = document.createElement('img')
          img.src = imageData.imageUrl
          img.alt = `Banner ${i + 1}`
          img.style.height = '100%'
          img.style.objectFit = 'cover'

          if (imageData.link) {
            const a = document.createElement('a')
            a.href = imageData.link
            a.target = '_blank'
            a.appendChild(img)
            avisoDiv.appendChild(a)
          } else {
            avisoDiv.appendChild(img)
          }

          targetItem.parentNode.insertBefore(avisoDiv, targetItem)
        }
      })
    }

    const observer = new MutationObserver(() => {
      injectBanners()
    })

    const targetNode = document.querySelector('.vtex-search-result-3-x-gallery') || document.body
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    })

    injectBanners()

    return () => observer.disconnect()
  }, [images])

  return null
}

GalleryWithBanners.getSchema = () => ({
  title: 'Banners Laterais',
  type: 'object',
  properties: {
    images: {
      title: 'Banners',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          imageUrl: {
            title: 'Imagem do banner',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          link: {
            title: 'Link do banner',
            type: 'string',
          },
          enabled: {
            title: 'Ativar este banner',
            type: 'boolean',
            default: true,
          },
        },
      },
    },
  },
})

export default GalleryWithBanners