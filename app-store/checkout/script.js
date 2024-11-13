

var intervalId = null;
var intervalClickDelivery = null;
var shippingContainer = $("#shipping-preview-container").prependTo(
  ".full-cart .summary-template-holder .summary-totalizers"
);

var moveShipping = function () {
  if ($("#shipping-preview-container").length) {
    $("#shipping-preview-container").prependTo(
      ".full-cart .summary-template-holder .summary-totalizers"
    );
    clearInterval(intervalId);
  }
};

var clickOnCepBtn = function () {
  if ($("button#shipping-calculate-link").length) {
    $("button#shipping-calculate-link").trigger("click");
    clearInterval(intervalClickDelivery);
  }
  setTimeout(function () {
    clearInterval(intervalClickDelivery);
  }, 8000);
};

const checkUrlAndRun = () => {
  const interval = setInterval(() => {
    if (window.location.href.includes('/checkout#/payment')) {
      const vale = document.querySelector('#show-gift-card-group');
      const valelabel = document.querySelector('.gift-card-section .payment-discounts-options label');
      if (vale) {
        vale.textContent = 'Vale-Compra';
        valelabel.textContent = 'Vale Compra';
        clearInterval(interval);
      } else {
        console.log('Elemento não encontrado, tentando novamente...');
      }
    }
  }, 1000);
};



const resizeImage = function () {
  const productItem = document.querySelectorAll(".cart-items img");
  console.log(productItem,'sizeeeee')
  productItem.forEach(function (item) {
    const src = item.getAttribute("src");
    const newSrc = src.replace("-55-55", "-100-100");
    item.setAttribute("src", newSrc);
    item.classList.add("active");
  });
};


var cashbackValue = 0;

var shipping =
  '<div class="b-frete"> 					<p class="frete-title"> 						Frete Grátis 					</p> 					<div class="frete-box"> 						<p class="frete-free"> 							Promoção válida para as regiões Sul,  							Sudeste e Centro-Oeste nas compras  							acima de R$ 399,00  						</p> 					</div> 				</div>';

var backToHome =
  '<a href="/"><button class="bt-keep-buying btn-outline" title="Botão: Continuar comprando"><i class="fas fa-arrow-left"></i> Continuar comprando</button></a>';

var addHtmlContent = function (selector, html) {
  var element = document.querySelector(selector);
  if (element) {
    element.insertAdjacentHTML("afterbegin", html);
  }
};

var addHtmlContentAfter = function (selector, html) {
  var element = document.querySelector(selector);
  if (element) {
    element.insertAdjacentHTML("beforeend", html);
  }
};


// const sellerCode = {
//   addForm: function () {
//     $('.full-cart .summary-totalizers.cart-totalizers').prepend(`
//         <div class="sellerCode">
//             <form class="sellerCode__form">
//                 <div class="sellerCode__label">
//                     <label for="sellerCode">Código do vendedor</label>
//                 </div>
//                 <div class="sellerCode__input">
//                     <input type="text" name="sellerCode" id="sellerCode" placeholder="Código" />
//                     <button type="submit" id="sellerCode__btn" class="btn">OK</button>
//                 </div>
//                 <div class="sellerCode__result">
//                     <div class="sellerCode__resultName"></div>
//                     <a href="#" class="sellerCode__clear">
//                         excluir
//                     </a>
//                 </div>
//             </form>
//         </div>
//     `)
//   },

//   fetchVendedor: function (code) {
//     console.log('fetched Vendedor')
//     fetch('/api/dataentities/CV/search?_fields=code,name,email&_where=code=' + code, {
//       headers: {
//         Accept: 'application/vnd.vtex.ds.v10+json',
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     })
//       .then(function (response) {
//         return response.json()
//       })
//       .then(function (data) {
//         if (data.length) {
//           let codigoVendedor = data[0].code
//           let nomeVendedor = data[0].name

//           vtexjs.checkout.getOrderForm().then(function (orderForm) {
//             let newMarketingData = orderForm.marketingData || {}
//             newMarketingData.utmiCampaign = 'vendedorestoryburch'
//             newMarketingData.utmiPart = codigoVendedor

//             $('.sellerCode__resultName').text(nomeVendedor)
//             $('.sellerCode__input').hide()
//             $('.sellerCode__result').css('display', 'flex')

//             localStorage.setItem('sellerInfo', JSON.stringify(data[0]))

//             vtexjs.checkout.sendAttachment('marketingData', newMarketingData)
//           })
//         } else {
//           $('.sellerCode__input').addClass('error')
//           if (!$('.errorText').length) {
//             $('.sellerCode__input').append('<span class="errorText">Código não encontrado</span>')
//           }
//         }
//       })
//   },

//   checkVendedor: function () {
//     $('.sellerCode__input').removeClass('error')
//     $('.errorText').remove()

//     vtexjs.checkout.getOrderForm().then(function (orderForm) {
//       let newMarketingData = orderForm.marketingData || {}
//       newMarketingData.utmiCampaign = null
//       newMarketingData.utmiPart = null
//       vtexjs.checkout.sendAttachment('marketingData', newMarketingData)
//     })

//     const sellerInfo = localStorage.getItem('sellerInfo')
//     let input = document.querySelector('#sellerCode')

//     if (sellerInfo) {
//       sellerCode.fetchVendedor(JSON.parse(sellerInfo).code)
//     } else {
//       document.querySelector('.sellerCode__form').addEventListener('submit', function (e) {
//         e.preventDefault()

//         let code = input.value

//         sellerCode.fetchVendedor(code)
//       })
//     }
//   },

//   removeCodVendedor: function () {
//     document.querySelector('.sellerCode__clear').addEventListener('click', function (e) {
//       e.preventDefault()
//       vtexjs.checkout.getOrderForm().then(function (orderForm) {
//         let newMarketingData = orderForm.marketingData || {}
//         newMarketingData.utmiCampaign = null
//         newMarketingData.utmiPart = null
//         vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
//           $('#sellerCode').val('')
//           $('.sellerCode__input').show()
//           $('.sellerCode__result').hide()

//           localStorage.removeItem('sellerInfo')
//           sellerCode.checkVendedor()
//         })
//       })
//     })
//   },

//   init: function () {
//     sellerCode.addForm()
//     sellerCode.checkVendedor()
//     sellerCode.removeCodVendedor()
//   },
// }


$(document).ready(function () {

  // sellerCode.init()

  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    cashbackValue = orderForm.totalizers[0].value * 0.30;
    cashbackValue = cashbackValue / 100;

    let items = orderForm.items;
    items.forEach((i) => {
      const skuId = i.id; // SKU do item atual

      // Faz a requisição para obter as informações do SKU
      fetch(`/api/catalog_system/pub/products/search/?fq=skuId:${skuId}`)
        .then((response) => response.json())
        .then((data) => {
          let sku = data[0].items.find((e) => e.itemId == skuId); // Encontra o SKU correto

          if (sku) {
            let color =
              sku.Cor && sku.Cor.length
                ? `<p class="product__color">Cor: ${sku.Cor[0]}</p>`
                : ""; // Verifica se há cores
            let size =
              sku.Tamanho && sku.Tamanho.length
                ? `<p class="product__size">Tamanho: ${sku.Tamanho[0]}</p>`
                : ""; // Verifica se há tamanhos

            // Seleciona todos os links de nome de produto
            const links = document.querySelectorAll(".product-name a");

            // Verifica cada link para ver se o id contém o número do SKU
            links.forEach((link) => {
              if (link.id && link.id.includes(skuId.toString())) {
                // Adiciona as informações de cor, tamanho e nome ao link correto
                link.insertAdjacentHTML("beforeend", color);
                link.insertAdjacentHTML("beforeend", size);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar informações do SKU:", error);
        });
    });

    var cashback =
      '<div class="loyality-points"><p class="text">Finalize seu pedido e <strong>receba R$ ' +
      cashbackValue.toFixed(2).replace(".", ",") +
      "</strong><br> em sua próxima compra.</p></div>";

    addHtmlContent(".full-cart .summary-template-holder", cashback);
  });

  intervalId = setInterval(moveShipping, 500);
  intervalClickDelivery = setInterval(clickOnCepBtn, 500);

  setTimeout(function () {
    addHtmlContent(".cart-links.cart-links-bottom", shipping);
    if (window.screen.width > 768) {
      addHtmlContentAfter(".cart-template-holder .cart", backToHome);
    } else {
      addHtmlContentAfter(".btn-place-order-wrapper", backToHome);
    }
  resizeImage()
  }, 1500);

  const titles = document.querySelectorAll("footer .title");

  checkUrlAndRun();


  titles.forEach((title) => {
    title.addEventListener("click", function () {
      const ulElement = this.nextElementSibling;
      ulElement.classList.toggle("active");
    });
  });
});
