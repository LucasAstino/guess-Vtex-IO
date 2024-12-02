import React, { useEffect } from "react";
import { Helmet } from "vtex.render-runtime";
// import {GlobalStyles} from "../global-css/index"
import '../global-css/style.css'

export const headCustom = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.innerHTML = `
      (function (o, c, t, a, d, e, s) {
        o.octadesk = o.octadesk || {};
        o.octadesk.chatOptions = {
          subDomain: a,
          showButton: d,
          openOnMessage: e,
          hide: s,
        };
        const bd = c.getElementsByTagName("body")[0];
        const sc = c.createElement("script");
        sc.async = true;
        sc.src = t;
        bd.appendChild(sc);
      })(window, document, 'https://cdn.octadesk.com/embed.js', 'o167017-6bc', 'true', 'true', 'false');
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup do script ao desmontar o componente
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        {/* <GlobalStyles/> */}
      </Helmet>
    </>
  );
};
