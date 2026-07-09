let novoServiceWorker = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(registro => {
        // Se já houver um Service Worker esperando para ser ativado
        if (registro.waiting) {
          novoServiceWorker = registro.waiting;
          mostrarBotaoAtualizacao();
        }

        registro.addEventListener("updatefound", () => {
          novoServiceWorker = registro.installing;

          novoServiceWorker.addEventListener("statechange", () => {
            if (
              novoServiceWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              mostrarBotaoAtualizacao();
            }
          });
        });
      })
      .catch(erro => {
        console.error("Erro ao registrar Service Worker:", erro);
      });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

function mostrarBotaoAtualizacao() {
  const botao = document.getElementById("btnAtualizar");

  if (botao) {
    botao.style.display = "flex";

    botao.addEventListener("click", () => {
      if (novoServiceWorker) {
        novoServiceWorker.postMessage({
          type: "SKIP_WAITING"
        });
      }
    });
  }
}
