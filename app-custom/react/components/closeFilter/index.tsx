import React, { useEffect } from 'react'
import styles from './CustomButtonTrigger.css'

interface Props {
  targetSelector: string // CSS selector do elemento ao lado do qual o botão aparecerá
  triggerSelector: string // CSS selector do elemento que será clicado
}

const CustomButtonTrigger: React.FC<Props> = ({ targetSelector, triggerSelector }) => {
  useEffect(() => {
    const targetElement = document.querySelector(targetSelector)

    if (targetElement) {
      const button = document.createElement('button')
      button.className = styles.customButton
      button.innerText = 'Clique Aqui'
      button.onclick = () => {
        const triggerElement = document.querySelector(triggerSelector)
        
        // Verifica se o triggerElement é um HTMLElement para garantir que o método .click() está disponível
        if (triggerElement instanceof HTMLElement) {
          triggerElement.click()
        }
      }

      // Insere o botão ao lado do elemento-alvo
      targetElement.insertAdjacentElement('afterend', button)
    }
  }, [targetSelector, triggerSelector])

  return null
}

export default CustomButtonTrigger
