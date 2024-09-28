import React, { useState, useEffect } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useOrderForm } from "vtex.order-manager/OrderForm";

const CSS_HANDLES = [
  "login",
  "login__container",
  "login__wrapper",
  "login__wrapper_open",
  "login__wrapper_closed",
  "login__list",
  "login__item",
  "login__icon",
  "login__link",
] as const;

export function LoginHeader() {
  const { orderForm } = useOrderForm();
  const { handles } = useCssHandles(CSS_HANDLES);
  const [modal, setModal] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    console.log(orderForm?.loggedIn);
    if (orderForm.loggedIn) {
      setLogged(true);
    }
  }, []);

  return (
    <div
      className={handles.login__container}
      onMouseEnter={() => setModal(true)}
      onMouseLeave={() => setModal(false)}
    >
      <div className={handles.login}>
        <i className={handles.login__icon}></i>
      </div>
      <div
        className={`${handles.login__wrapper} ${
          modal ? handles.login__wrapper_open : handles.login__wrapper_closed
        }`}
      >
        {logged ? (
          <ul className={handles.login__list}>
            <li className={handles.login__item}>
              <a className={handles.login__link} href="/account">
                Minha conta
              </a>
            </li>
            <li className={handles.login__item}>
              <a className={handles.login__link} href="/account#/orders">
                Meus pedidos
              </a>
            </li>
          </ul>
        ) : (
          <ul className={handles.login__list}>
            <li className={handles.login__item}>
              <a className={handles.login__link} href="/login">
                Login
              </a>
            </li>
            <li className={handles.login__item}>
              <a className={handles.login__link} href="/login">
                Cadastrar
              </a>
            </li>
            <li className={handles.login__item}>
              <a className={handles.login__link} href="/account#/orders">
                Meus pedidos
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
