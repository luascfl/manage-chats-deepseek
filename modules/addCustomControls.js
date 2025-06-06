// addCustomControls.js

// Função auxiliar para verificar se a sidebar está ativa
const isSidebarActive = () => {
  const sidebarDiv = document.querySelector("#root > div > div.c3ecdb44 > div.dc04ec1d");
  return sidebarDiv && sidebarDiv.classList.contains("dc04ec1d") && !sidebarDiv.classList.contains("a02af2e6");
};

export const addCustomControls = () => {
  if (isSidebarActive()) {
    const targetDiv = document.querySelector("#root > div > div.c3ecdb44 > div.dc04ec1d > div.b8812f16.a2f3d50e");
    if (targetDiv) {
      if (!targetDiv.querySelector(".controls-container")) {
        // Container principal dos controles
        const controlsContainer = document.createElement("div");
        controlsContainer.className = "controls-container";
        controlsContainer.style.zIndex = "1000";
        controlsContainer.style.width = "85%";
        controlsContainer.style.display = "flex";
        controlsContainer.style.flexDirection = "column"; // Mantém a disposição vertical do container principal
        controlsContainer.style.alignItems = "center";
        controlsContainer.style.justifyContent = "center";
        controlsContainer.style.padding = "10px";
        controlsContainer.style.paddingBlock = "0px";
        controlsContainer.style.borderRadius = "8px";
        controlsContainer.style.margin = "10px 0";
        controlsContainer.style.marginLeft = "4%";
        controlsContainer.style.marginTop = "-10px";

        // Cria um container para agrupar o texto "Multi select action" e o toggle na mesma linha
        const actionContainer = document.createElement("div");
        actionContainer.style.display = "flex";
        actionContainer.style.flexDirection = "row"; // Itens na mesma linha
        actionContainer.style.alignItems = "center";
        actionContainer.style.justifyContent = "center";
        actionContainer.style.gap = "10px"; // Espaço entre os itens (pode ser ajustado)

        // Texto da ação
        const actionText = document.createElement("span");
        actionText.innerText = "Multi select action";
        actionText.style.fontSize = "16px";
        actionText.style.color = "#333";
        actionText.style.fontWeight = "500";

        // Cria o toggle switch
        const toggleButton = document.createElement("label");
        toggleButton.className = "toggle-switch";
        toggleButton.style.display = "inline-flex";
        toggleButton.style.alignItems = "center";
        toggleButton.style.cursor = "pointer";
        // Remova ou ajuste a margem superior para alinhá-lo junto com o texto
        toggleButton.style.marginTop = "0";

        const toggleInput = document.createElement("input");
        toggleInput.type = "checkbox";
        toggleInput.style.display = "none";

        const toggleSlider = document.createElement("span");
        toggleSlider.style.position = "relative";
        toggleSlider.style.width = "40px";
        toggleSlider.style.height = "20px";
        toggleSlider.style.backgroundColor = "#ccc";
        toggleSlider.style.borderRadius = "20px";
        toggleSlider.style.transition = "0.3s";

        const toggleCircle = document.createElement("span");
        toggleCircle.style.position = "absolute";
        toggleCircle.style.top = "2px";
        toggleCircle.style.left = "2px";
        toggleCircle.style.width = "16px";
        toggleCircle.style.height = "16px";
        toggleCircle.style.backgroundColor = "#fff";
        toggleCircle.style.borderRadius = "50%";
        toggleCircle.style.transition = "0.3s";

        toggleSlider.appendChild(toggleCircle);
        toggleButton.appendChild(toggleInput);
        toggleButton.appendChild(toggleSlider);

        // Ao mudar o estado do toggle, carrega dinamicamente e chama toggleCheckboxes
        toggleInput.addEventListener("change", async () => {
          const { toggleCheckboxes } = await import(chrome.runtime.getURL('modules/toggleCheckboxes.js'));
          const { manageSelectNonPriority } = await import(chrome.runtime.getURL('modules/manageSelectNonPriority.js'));

          if (toggleInput.checked) {
            toggleSlider.style.backgroundColor = "#4caf50";
            toggleCircle.style.transform = "translateX(20px)";
            toggleCheckboxes(true);
            manageSelectNonPriority(true);
          } else {
            toggleSlider.style.backgroundColor = "#ccc";
            toggleCircle.style.transform = "translateX(0)";
            toggleCheckboxes(false);
            manageSelectNonPriority(false);
          }
        });

        // Adiciona o texto e o toggle ao container de ação (mesma linha)
        actionContainer.appendChild(actionText);
        actionContainer.appendChild(toggleButton);

        // Adiciona os elementos ao container principal
        controlsContainer.appendChild(actionContainer); // Linha com Multi select action + toggle

        // Insere o container na div alvo (na posição desejada)
        const thirdChild = targetDiv.children[2];
        if (thirdChild) {
          targetDiv.insertBefore(controlsContainer, thirdChild);
        } else {
          targetDiv.appendChild(controlsContainer);
        }
      }
    } else {
      console.error("Div alvo não encontrada!");
    }
  }
};
