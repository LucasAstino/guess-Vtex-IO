//@ts-ignore
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/style.css';

const PopupForm = () => {

  const acronym = "CL"

  //@ts-ignore
  const ref = useRef(null);
  //@ts-ignore
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [birthDay, setBirthday] = useState(new Date())
  //@ts-ignore
  const [optin, setOptin] = useState(false)

  const [success, setSuccess] = useState(false)


  useEffect(() => {
    const isFirstVisit = localStorage.getItem('firstVisit') === null;

    (isFirstVisit) ? (setShowModal(true), localStorage.setItem('firstVisit', 'false')) : null

  }, [ email, optin, success]);




  const closeModal = () => {
    setShowModal(false);
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: any) => {
    console.log("Handle Submit,", e)

    const checkbox = document.getElementById("checkNewsletterTerms") as HTMLInputElement

    if (!email || !checkbox.checked) {

      if (!email || !isValidEmail(email)) return alert("Digite um email válido")
      if (!checkbox.checked) return alert("É obrigatório o aceite do termo de consentimento")

    }

    try {
      const request = await fetch(`/api/dataentities/${acronym}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          email,
        }),
      })

      const response = await request.json()
      response
      setSuccess(true)
    }

    catch (e) {
      alert("Houve um problema ao se cadastrar, por favor tente mais tarde.")
    }
  }
  return (
    <>
      {showModal && (
        <div id={"modalBackground"} className={styles.modal_overlay}>
          <div className={`${styles.modal_container} ${success ? styles.modal_container_bgWhite : null}`}>
            {(!success) && (<>
              <div className={styles.modal__right}>
                <div className={styles.modal__head}>
                <div className={styles.popup__formTitle}>Ganhe <span>R$ 50</span> na <span>Guess List</span></div>
                  <button className={styles.modal_close} onClick={() => { closeModal() }}>
                    x
                  </button>
                </div>

                <div className={styles.modal__body}>
                  
                  <div className={styles.popup__formGreetings}>Nas compras acima de R$300,
                  ganhe R$50!</div>
                  <div className={styles.popup__formText}>Válido para a primeira compra.</div>

                  <div className={styles.modal__formWrap}>
                    <label className={styles.label} htmlFor="email">E-mail:</label>
                    <input type="email" name="email" className={styles.inputFullWidth} onChange={(e) => { setEmail(e.target.value); }} />
                    <div className={styles.optinWrapp}>
                      <input id={"checkNewsletterTerms"} className={styles.check} type="checkbox" />

                      Desejo receber ofertas e informativos por e-mail 
                    </div>
                    <button type="submit" onClick={(e) => { handleSubmit(e); }} className={styles.sendButton} >Enviar!</button>
                      <p className={styles.policy}>A GUESS se preocupa com o uso de seus dados pessoais.
Ao fornecer seus dados você concorda com a nossa
<a className={styles.policyLink} href="/institucional/politica-de-privacidade" target='_blank'>Política de Privacidade</a></p> 
                  </div>
                </div>
              </div>
            </>)}
            {success && (<>
              <div className={styles.modal__successWrapp}>
                <button className={styles.modal_close} onClick={() => { closeModal() }}>
                  x
                </button>
                <button className={styles.modal_close__mobile} onClick={() => { closeModal() }}>
                  x
                </button>
                <img src="https://guessbr.vtexassets.com/assets/vtex/assets-builder/guessbr.fg-store/1.0.28/logo/new-logo-guess-small___27ee63f1c7bf362b14233e6c9c9630c7.png" alt="modelo" width={80} height={80} />
                <p className={styles.success__message}>Cadastro realizado com sucesso!</p>
                <em className={styles.modal__line}> </em>
                <div className={styles.coupon__container}>
                  <p className={styles.couponTextTitle}> Use o cupom </p>
                  <h1 className={styles.couponCode}> PRIMEIRA50 </h1>
                  <span className={styles.couponSubText}> <br /><strong></strong> </span>
                  <input type='submit' className={styles.returnToSiteBtn} onClick={() => { closeModal() }} value="Ir para o site" />
                </div>
              </div>

            </>)}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
