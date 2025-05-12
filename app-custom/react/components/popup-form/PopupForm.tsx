import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/style.css";

const PopupForm = () => {
  const acronym = "CL";
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Exibe o modal após scroll de 300px
  useEffect(() => {
    const hasShownPopup = localStorage.getItem("popupShown");

    if (hasShownPopup) return;

    const handleScroll = () => {
      const scrollThreshold = 300;
      if (window.scrollY > scrollThreshold) {
        setShowModal(true);
        localStorage.setItem("popupShown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const closeModal = () => {
    setShowModal(false);
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const checkbox = document.getElementById(
      "checkNewsletterTerms"
    ) as HTMLInputElement;

    if (!email || !checkbox?.checked) {
      if (!email || !isValidEmail(email))
        return alert("Digite um email válido");
      if (!checkbox?.checked)
        return alert("É obrigatório o aceite do termo de consentimento");
    }

    try {
      const request = await fetch(`/api/dataentities/${acronym}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const response = await request.json();
      console.log(response);
      setSuccess(true);
    } catch (e) {
      alert("Houve um problema ao se cadastrar, por favor tente mais tarde.");
    }
  };

  return (
    <>
      {showModal && (
        <div
          id="modalBackground"
          className={styles.modal_overlay}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`${styles.modal_container} ${success ? styles.modal_container_bgWhite : ""
              }`}
          >
            {!success && (
              <div className={styles.modal__right}>
                <div className={styles.modal__head}>
                  <div className={styles.popup__formTitle}>
                    Ganhe <span>R$ 50</span> na <span>Guess List</span>
                  </div>
                  <button
                    className={styles.modal_close}
                    onClick={closeModal}
                    aria-label="Fechar modal"
                  >
                    x
                  </button>
                </div>

                <div className={styles.modal__body}>
                  <div className={styles.popup__formGreetings}>
                    Nas compras acima de R$300, ganhe R$50!
                  </div>
                  <div className={styles.popup__formText}>
                    Válido para a primeira compra.
                  </div>

                  <div className={styles.modal__formWrap}>
                    <label className={styles.label} htmlFor="email">
                      E-mail:
                    </label>
                    <input
                      ref={inputRef}
                      type="email"
                      name="email"
                      className={styles.inputFullWidth}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <div className={styles.optinWrapp}>
                      <input
                        id="checkNewsletterTerms"
                        className={styles.check}
                        type="checkbox"
                      />
                      Desejo receber ofertas e informativos por e-mail
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={styles.sendButton}
                    >
                      Enviar!
                    </button>
                    <p className={styles.policy}>
                      A GUESS se preocupa com o uso de seus dados pessoais. Ao
                      fornecer seus dados você concorda com a nossa
                      <a
                        className={styles.policyLink}
                        href="/politicas-de-privacidade-e-cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className={styles.modal__successWrapp}>
                <button
                  className={styles.modal_close_success}
                  onClick={closeModal}
                  aria-label="Fechar modal"
                >
                  x
                </button>
                <button
                  className={styles.modal_close__mobile}
                  onClick={closeModal}
                  aria-label="Fechar modal"
                >
                  x
                </button>
                <p className={styles.success__message}>
                  Aproveite<br />
                  seu cupom!
                </p>
                <div className={styles.coupon__container}>
                  <p className={styles.couponCode}>PRIMEIRA50</p>
                  <span className={styles.couponSubText}>
                    Para ativá-lo, basta inserir no
                    carrinho antes de finalizar a compra
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
