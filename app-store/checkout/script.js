var intervalId = null;
var shippingContainer = $('#shipping-preview-container').prependTo('.full-cart .summary-template-holder .summary-totalizers');
var moveShipping = function () {
    if ($('#shipping-preview-container').length) {
        $('#shipping-preview-container').prependTo('.full-cart .summary-template-holder .summary-totalizers');
        clearInterval(intervalId);
    }
};

var clickOnCepBtn = function () {
    if ($('button#shipping-calculate-link').length) {
        $('button#shipping-calculate-link').trigger('click');
        clearInterval(intervalClickDelivery);
    }
    setTimeout(function () {
        clearInterval(intervalClickDelivery);
    }, 8000);
}

$(document).ready(function () {
    intervalId = setInterval(moveShipping, 500);
    intervalClickDelivery = setInterval(clickOnCepBtn, 500);
});

document.addEventListener('DOMContentLoaded', function () {

    const diferenciais = document.querySelector('.diferenciais');

    if (diferenciais) {

        const slider = document.querySelector('.slider');
        const items = document.querySelectorAll('.item');
        let currentIndex = 0;
        const totalItems = items.length;

        function goToSlide(index) {
            const slideWidth = items[0].clientWidth; // Calcula a largura do slide dinamicamente
            slider.style.transform = `translateX(-${index * slideWidth}px)`; // Movimenta o slider
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems; // Próximo slide cíclico
            goToSlide(currentIndex);
        }

        // Intervalo para mudar de slide a cada 3 segundos
        setInterval(nextSlide, 3000);

        // Recalcula a posição ao redimensionar a janela para garantir que funcione em responsividade
        window.addEventListener('resize', function () {
            goToSlide(currentIndex);
        });

        document.querySelector('.diferenciais').classList.add('active');

    };
});