import React, { useEffect, useState } from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = [
  "hello__user",
  "hello__user-login",
  "hello__login-link",
] as const;

export function LoginOrUserName() {
    const{handles} = useCssHandles(CSS_HANDLES)
  const { orderForm } = useOrderForm();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (orderForm?.loggedIn) {
      console.log(orderForm,"orderfrommmmmm")
        if(orderForm.clientProfileData.firstName){
            setUserName(orderForm.clientProfileData.firstName)
        }
        setUserName('Usuário')
    }
  }, [orderForm]);

  return (
    <>
      {userName ? (
        <p className={handles.hello__user}>Olá, {userName}!</p>
      ) : (
        <p className={handles.hello__user}>
          Olá, <a className={handles['hello__login-link']} href="/login?returnUrl=%2F">Entre ou Cadastre-se</a>
        </p>
      )}
    </>
  );
}
