import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface CustomTextSliderProps {
  texts: { text: string }[] // Atualizado para refletir o novo tipo
  transitionTime: number
  textColor: string
  backgroundColor: string
}

export const CSS_HANDLES = ['textSliderContainer', 'textSliderItem'] as const

 export const CustomTextSlider: React.FC<CustomTextSliderProps> & { schema?: object } = ({
  texts,
  transitionTime,
  textColor,
  backgroundColor
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const { handles } = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, transitionTime)

    return () => clearInterval(interval)
  }, [texts, transitionTime])

  return (
    <div
      className={handles.textSliderContainer}
      style={{ backgroundColor }}
    >
      {texts.map((item, index) => (
        <p
          key={index}
          className={`${handles.textSliderItem} ${index === currentTextIndex ? 'active' : ''}`}
          style={{
            color: textColor,
            opacity: index === currentTextIndex ? 1 : 0
          }}
        >
          {item.text}
        </p>
      ))}
    </div>
  )
}

CustomTextSlider.defaultProps = {
  texts: [
    { text: 'Promoção de Frete Grátis válido para as regiões Sul, Sudeste e Centro-oeste do país' },
    { text: 'Frete grátis nas compras acima de R$ 499,00' }
  ],
  transitionTime: 3000,
  textColor: '#000000',
  backgroundColor: '#FFFFFF'
}

CustomTextSlider.schema = {
  title: 'Custom Text Slider',
  description: 'A slider with customizable texts, colors, and transition time.',
  type: 'object',
  properties: {
    texts: {
      title: 'Texts for Slider',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: {
            title: 'Text',
            type: 'string',
            default: 'New text'
          }
        }
      },
      default: [
        { text: 'Promoção de Frete Grátis válido para as regiões Sul, Sudeste e Centro-oeste do país' },
        { text: 'Frete grátis nas compras acima de R$ 499,00' }
      ]
    },
    transitionTime: {
      title: 'Transition Time (ms)',
      type: 'number',
      default: 3000,
    },
    textColor: {
      title: 'Text Color',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      },
      default: '#000000'
    },
    backgroundColor: {
      title: 'Background Color',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      },
      default: '#FFFFFF'
    }
  }
}

