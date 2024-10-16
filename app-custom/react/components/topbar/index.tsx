import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface CustomTextSliderProps {
  texts: string[]
  transitionTime: number // tempo em milissegundos para cada troca de texto
}

export const CSS_HANDLES = ['textSliderContainer', 'textSliderItem'] as const

// Definir um tipo estendido que inclui a propriedade 'schema'
interface CustomTextSliderComponent extends React.FC<CustomTextSliderProps> {
  schema: object
}

export const CustomTextSlider: CustomTextSliderComponent = ({ texts, transitionTime }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const {handles} = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, transitionTime)

    return () => clearInterval(interval)
  }, [texts, transitionTime])

  return (
    <div className={handles.textSliderContainer}>
      {texts.map((text, index) => (
        <p
          key={index}
          className={`${handles.textSliderItem} ${index === currentTextIndex ? 'active' : ''}`}
          style={{ opacity: index === currentTextIndex ? 1 : 0 }}
        >
          {text}
        </p>
      ))}
    </div>
  )
}

CustomTextSlider.defaultProps = {
  texts: ['Promoção de Frete Grátis válido para as regiões Sul, Sudeste e Centro- oeste do país', 'Frete grátis nas compras acima de R$ 499,00'],
  transitionTime: 3000, // 3 segundos
}

// Adicionando o schema como uma propriedade estática
CustomTextSlider.schema = {
  title: 'Custom Text Slider',
  type: 'object',
  properties: {
    texts: {
      title: 'Texts for Slider',
      type: 'array',
      items: {
        type: 'string',
        title: 'Text',
      },
    },
    transitionTime: {
      title: 'Transition Time (ms)',
      type: 'number',
      default: 3000,
    },
  },
}


