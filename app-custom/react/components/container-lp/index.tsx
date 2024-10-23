import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { useCssHandles } from 'vtex.css-handles'

interface CustomContainerProps {
  backgroundColor?: string
  children: React.ReactNode
}

interface CustomContainerSchema extends FC<CustomContainerProps> {
  schema: object
}

const CSS_HANDLES = ['customContainer'] as const

export const CustomContainer: CustomContainerSchema = ({ backgroundColor = 'transparent', children }) => {
  const {handles} = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={handles.customContainer}
      style={{
        backgroundColor: backgroundColor, 
      }}
    >
      {children}
    </div>
  )
}

CustomContainer.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
}

CustomContainer.schema = {
  title: 'Custom Container',
  description: 'A container that accepts children and has customizable background color.',
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
  },
}

