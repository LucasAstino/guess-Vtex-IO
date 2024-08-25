# Documentação do Componente AstinoMenu

## Descrição

Fala Devs blz? O componente `AstinoMenu` é um menu customizado para a plataforma VTEX IO. Ele suporta múltiplos níveis de submenu e banners, e permite a personalização de cores e links, além de ser possivel criar um menu só de banners se precisar.

## Site Editor

O menu é bem customizável pelo cliente no site editor, tanto cores, como ordem de links e banners.

 **⚠️ Atenção:** Por causa do cache da Vtex pode acontecer das props que estão no Menu json não prevalecer, para resolver isso bastar limpar o cache do componente colocando um ID no mesmo, Ex: "AstinoMenu#cache" . Caso queira pode colocar pelo Site Editor pois por la não acontece isso.

## Estrutura do Componente

O componente `AstinoMenu` aceita uma estrutura JSON para definir o menu. Abaixo está um exemplo completo e detalhado:

```json
{
  "AstinoMenu": {
    "props": {
      // Definição da lista principal de links do menu
      "menuLinks": [
        {
          // Primeiro item do menu com submenu e banners
          "text": "Feminino", // Texto do link principal
          "url": "/feminino", // URL para onde o link redireciona
          "hasSubmenu": true, // Indica que este link possui um submenu
          "submenuLinks": [ // Links do submenu de primeiro nível
            {
              "text": "Roupas",
              "url": "/feminino/roupas",
              "hasSubmenu": true, // Este link também possui um submenu
              "submenuLinks": [ // Links do submenu de segundo nível
                { "text": "Ver tudo", "url": "/feminino/roupas/ver-tudo" },
                { "text": "Blusas", "url": "/feminino/roupas/blusas" },
                { "text": "Calças", "url": "/feminino/roupas/calcas" },
                { "text": "Vestidos", "url": "/feminino/roupas/vestidos" }
              ]
            },
            {
              "text": "Acessórios",
              "url": "/feminino/acessorios",
              "hasSubmenu": true,
              "submenuLinks": [
                { "text": "Bolsas", "url": "/feminino/acessorios/bolsas" },
                { "text": "Óculos", "url": "/feminino/acessorios/oculos" },
                { "text": "Relógios", "url": "/feminino/acessorios/relogios" }
              ]
            }
          ],
          "banners": [ // Banners exibidos no submenu do link "Feminino"
            {
              "bannerImage": "https://example.com/banner1.png",
              "bannerLink": "/promo-feminino"
            },
            {
              "bannerImage": "https://example.com/banner2.png",
              "bannerLink": "/promo-feminino-2"
            }
          ],
          "linkColor": "#FF0000" // Cor dos links no submenu
        },
        {
          // Segundo item do menu com um submenu simples e um banner
          "text": "Masculino",
          "url": "/masculino",
          "hasSubmenu": true,
          "submenuLinks": [
            { "text": "Roupas", "url": "/masculino/roupas" },
            { "text": "Calçados", "url": "/masculino/calcados" },
            { "text": "Acessórios", "url": "/masculino/acessorios" }
          ],
          "banners": [
            {
              "bannerImage": "https://example.com/banner3.png",
              "bannerLink": "/promo-masculino"
            }
          ]
        },
        {
          // Terceiro item do menu sem submenu, apenas um link simples
          "text": "Ofertas",
          "url": "/ofertas",
          "hasSubmenu": false
        },
        {
          // Quarto item do menu com um submenu e sem banners
          "text": "Infantil",
          "url": "/infantil",
          "hasSubmenu": true,
          "submenuLinks": [
            { "text": "Roupas", "url": "/infantil/roupas" },
            { "text": "Brinquedos", "url": "/infantil/brinquedos" },
            { "text": "Calçados", "url": "/infantil/calcados" }
          ]
        },
        {
          // Quinto item do menu com um submenu e múltiplos banners
          "text": "Acessórios",
          "url": "/acessorios",
          "hasSubmenu": true,
          "submenuLinks": [
            { "text": "Bolsas", "url": "/acessorios/bolsas" },
            { "text": "Relógios", "url": "/acessorios/relogios" },
            { "text": "Óculos", "url": "/acessorios/oculos" }
          ],
          "banners": [
            {
              "bannerImage": "https://example.com/banner4.png",
              "bannerLink": "/promo-acessorios"
            },
            {
              "bannerImage": "https://example.com/banner5.png",
              "bannerLink": "/promo-acessorios-2"
            }
          ]
        }
      ]
    }
  }
},
  "_comment": {
      "Explicação dos Campos": {
         "menuLinks": "Array contendo os itens principais do menu.",
         "text": "Texto exibido para o usuário.",
         "url": "URL para onde o link redireciona.",
         "hasSubmenu": "Booleano que indica se o item possui um submenu.",
         "submenuLinks": "Array com links do submenu, que pode ter múltiplos níveis.",
         "banners": "Array com banners exibidos no submenu.",
         "bannerImage": "URL da imagem do banner.",
         "bannerLink": "URL para onde o banner redireciona.",
         "linkColor": "Cor dos links no submenu (opcional)."
        },
        "Exemplos de Uso": "O menu pode ser utilizado para criar estruturas complexas com múltiplos níveis de navegação e banners promocionais."
    }






