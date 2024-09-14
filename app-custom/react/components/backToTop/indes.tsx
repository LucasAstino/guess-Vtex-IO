export function backToTop() {
    const _btnSubir = document.querySelector<HTMLButtonElement>(".btn-go-top");
  
    if (!_btnSubir) return;
  
    // Função para adicionar o efeito fadeIn
    const fadeIn = (element: HTMLElement) => {
      element.style.opacity = '0';
      element.style.display = 'flex';
      let opacity = 0;
      const intervalID = setInterval(() => {
        if (opacity >= 1) {
          clearInterval(intervalID);
        }
        opacity += 0.1;
        element.style.opacity = `${opacity}`;
      }, 30);
    };
  
    // Função para adicionar o efeito fadeOut
    const fadeOut = (element: HTMLElement) => {
      let opacity = 1;
      const intervalID = setInterval(() => {
        if (opacity <= 0) {
          clearInterval(intervalID);
          element.style.display = 'none';
        }
        opacity -= 0.1;
        element.style.opacity = `${opacity}`;
      }, 30);
    };
  
    const checkScrollPosition = () => {
      const minhaposicao = window.scrollY;
  
      if (minhaposicao >= 100) {
        if (_btnSubir.style.display === 'none' || _btnSubir.style.opacity === '0') {
          fadeIn(_btnSubir);
        }
      } else {
        if (_btnSubir.style.display === 'flex') {
          fadeOut(_btnSubir);
        }
      }
    };
  
    // Verifica a posição inicial ao carregar a página
    checkScrollPosition();
  
    // Listener para quando a página é rolada
    window.addEventListener("scroll", checkScrollPosition);
  
    // Evento de clique para retornar ao topo
    _btnSubir.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  