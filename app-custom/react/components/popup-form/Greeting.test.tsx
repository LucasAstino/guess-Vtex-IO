import React from 'react'
import { render } from '@vtex/test-tools/react'

import PopupForm from './PopupForm'

test('greets Fred', () => {
  const { queryByText } = render(<PopupForm />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
})
