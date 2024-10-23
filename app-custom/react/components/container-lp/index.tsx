import React, { FC, CSSProperties } from 'react'
import PropTypes from 'prop-types'
import { useCssHandles } from 'vtex.css-handles'

interface CustomContainerProps {
  backgroundColor?: string
  textColor?: string // Cor do texto recebida via prop
  invertFilter?: boolean // Novo prop para aplicar o filter: invert(1)
  children: React.ReactNode
}

interface CustomContainerSchema extends FC<CustomContainerProps> {
  schema: object
}

const CSS_HANDLES = ['customContainer'] as const

export const CustomContainer: CustomContainerSchema = ({ backgroundColor = 'transparent', textColor = '#000', invertFilter = false, children }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  // Aplicando o filtro invertido condicionalmente
  const customStyles: CSSProperties & { [key: string]: string | number } = {
    backgroundColor: backgroundColor,
    '--custom-text-color': textColor || '#000', // Definindo a variável customizada
    '--invert-filter': invertFilter ? 'invert(1)' : 'none', // Aplicando o filter invert(1) se invertFilter for true
  }

  return (
    <div
      className={handles.customContainer}
      style={customStyles} // Usando o objeto de estilo com variável customizada
    >
      {children}
    </div>
  )
}

// PropTypes para validação
CustomContainer.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  invertFilter: PropTypes.bool, // Validando o prop invertFilter como booleano
  children: PropTypes.node.isRequired,
}

// Schema para o Site Editor
CustomContainer.schema = {
  title: 'Custom Container',
  description: 'A container that accepts children and has customizable background, text color, and invert filter.',
  type: 'object',
  properties: {
    backgroundColor: {
      title: 'Background Color',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: 'transparent',
    },
    textColor: {
      title: 'Text Color',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: '#000',
    },
    invertFilter: {
      title: 'Invert Filter',
      type: 'boolean',
      default: false, // Valor padrão
    },
  },
}
