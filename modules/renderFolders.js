// renderFolders.js

export const renderFolders = () => {
  // Recupera os folders do localStorage
  const folders = JSON.parse(localStorage.getItem("folders")) || {};
  console.log("[renderFolders] Folders carregados do localStorage:", folders);

  // Seleciona o container onde os folders serão inseridos
  const sidebar = document.querySelector("#root > div > div.c3ecdb44 > div.dc04ec1d > div.b8812f16.a2f3d50e");
  if (!sidebar) {
    console.error("[renderFolders] Sidebar não encontrada com o seletor especificado.");
    return;
  } else {
    console.log("[renderFolders] Sidebar encontrada:", sidebar);
  }

  if (Object.keys(folders).length === 0) {
    console.log("[renderFolders] Nenhum folder para renderizar.");
    return;
  }

  // Remove o container de folders existente, se houver
  const existingFolderContainer = document.querySelector(".folder-container");
  if (existingFolderContainer) {
    console.log("[renderFolders] Removendo container de folders existente.");
    existingFolderContainer.remove();
  }

  // Cria o container que irá agrupar o toggle global e a lista de folders
  const folderContainer = document.createElement("div");
  folderContainer.className = "folder-container";
  folderContainer.style.marginTop = "-50px";
  folderContainer.style.marginBottom = "30px";
  folderContainer.style.transition = "all 0.3s ease";

  // Cria um toggle customizado usando um input checkbox e um label para mostrar/ocultar toda a área de folders
  const toggleWrapper = document.createElement("div");
  toggleWrapper.style.display = "flex";
  toggleWrapper.style.alignItems = "center";

  const toggleLabel = document.createElement("label");
  toggleLabel.style.position = "relative";
  toggleLabel.style.display = "inline-block";
  toggleLabel.style.width = "50px";
  toggleLabel.style.height = "24px";
  toggleLabel.style.marginRight = "10px";

  const toggleInput = document.createElement("input");
  toggleInput.type = "checkbox";
  toggleInput.style.opacity = "0";
  toggleInput.style.width = "0";
  toggleInput.style.height = "0";

  toggleWrapper.appendChild(toggleLabel);

  // Cria o container da lista de folders com visual moderno
  const folderList = document.createElement("div");
  folderList.className = "folder-list";
  folderList.style.padding = "10px";
  folderList.style.paddingBlock = "0px";
  folderList.style.backgroundColor = "#ffffff";
  folderList.style.border = "1px solid #e0e0e0";
  // Em vez de usar maxHeight, definimos uma altura fixa inicial (que poderá ser ajustada)
  folderList.style.height = "120px";
  folderList.style.overflowY = "auto";
  folderList.style.transition = "all 0.3s ease";
  folderList.style.display = "block";

  // Itera sobre cada folder para criar os itens
  Object.keys(folders).forEach((folderName) => {
    console.log("[renderFolders] Processando folder:", folderName);

    // Container do folder
    const folderItem = document.createElement("div");
    folderItem.className = "folder-item";
    folderItem.style.padding = "8px";
    folderItem.style.borderBottom = "1px solid #f0f0f0";

    // Cabeçalho do folder com título, toggle interno e ação de deletar o folder
    const folderHeader = document.createElement("div");
    folderHeader.className = "folder-header";
    folderHeader.style.display = "flex";
    folderHeader.style.alignItems = "center";
    folderHeader.style.justifyContent = "space-between";
    folderHeader.style.cursor = "pointer";

    // Cria um container para o título e o ícone de delete do folder
    const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.alignItems = "center";

    // Ícone de pasta
    const folderIcon = document.createElement("span");
    folderIcon.innerText = "📁";
    folderIcon.style.fontSize = "18px";
    folderIcon.style.marginRight = "8px";

    // Título do folder
    const folderTitle = document.createElement("span");
    folderTitle.innerText = folderName;
    folderTitle.style.fontSize = "16px";
    folderTitle.style.fontWeight = "600";
    folderTitle.style.color = "#333";
    folderTitle.style.marginRight = "8px";

    // Ícone de lixeira para deletar o folder (ao lado do título)
    const folderDeleteIcon = document.createElement("span");
    folderDeleteIcon.innerText = "🗑";
    folderDeleteIcon.style.cursor = "pointer";
    folderDeleteIcon.style.fontSize = "16px";
    folderDeleteIcon.style.color = "#d9534f"; // vermelho
    folderDeleteIcon.title = "Delete Folder";
    folderDeleteIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Impede que o clique afete o toggle interno
      if (confirm(`Deseja deletar a pasta "${folderName}"?`)) {
        // Remove a pasta do objeto folders e atualiza o localStorage
        delete folders[folderName];
        localStorage.setItem("folders", JSON.stringify(folders));
        // Re-renderiza os folders
        renderFolders();
      }
    });

    titleContainer.appendChild(folderIcon);
    titleContainer.appendChild(folderTitle);
    titleContainer.appendChild(folderDeleteIcon);

    // Botão de toggle interno para mostrar/ocultar os chats do folder
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "▼";
    toggleButton.style.background = "none";
    toggleButton.style.border = "none";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.fontSize = "18px";
    toggleButton.style.color = "#888";
    toggleButton.style.transition = "transform 0.3s ease";

    // Conteúdo do folder (lista de chats)
    const folderContent = document.createElement("div");
    folderContent.className = "folder-content";
    folderContent.style.display = "none";
    folderContent.style.marginTop = "8px";
    folderContent.style.paddingLeft = "10px";

    // Para cada sessionId neste folder, cria um item com ação de delete individual
    folders[folderName].forEach((sessionId) => {
      console.log(`[renderFolders] Processando sessionId ${sessionId} para folder ${folderName}`);
      const session = window.sessionIds && window.sessionIds.find((session) => session.id === sessionId);
      if (session) {
        console.log(`[renderFolders] Session encontrada para id ${sessionId}:`, session);
        const chatItem = document.createElement("div");
        chatItem.style.display = "flex";
        chatItem.style.alignItems = "center";
        chatItem.style.justifyContent = "space-between";
        chatItem.style.padding = "6px 8px";
        chatItem.style.backgroundColor = "#f5f5f5";
        chatItem.style.borderRadius = "4px";
        chatItem.style.marginBottom = "6px";
        chatItem.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.08)";
        chatItem.style.fontSize = "14px";
        chatItem.style.color = "#555";
        chatItem.style.transition = "background-color 0.2s ease";

        const chatTitle = document.createElement("span");
        chatTitle.innerText = session.title;
        chatTitle.style.flexGrow = "1";
        chatTitle.style.cursor = "pointer";

        chatTitle.addEventListener("click", (e) => {
          window.open(`https://chat.deepseek.com/a/chat/s/${session.id}`);
        });

        const chatDeleteIcon = document.createElement("span");
        chatDeleteIcon.innerText = "🗑";
        chatDeleteIcon.style.cursor = "pointer";
        chatDeleteIcon.style.fontSize = "16px";
        chatDeleteIcon.style.color = "#d9534f";
        chatDeleteIcon.title = "Delete Chat";
        chatDeleteIcon.addEventListener("click", (e) => {
          e.stopPropagation();
          if (confirm(`Deseja remover este chat da pasta "${folderName}"?`)) {
            const updatedFolder = folders[folderName].filter(id => id !== sessionId);
            folders[folderName] = updatedFolder;
            localStorage.setItem("folders", JSON.stringify(folders));
            renderFolders();
          }
        });

        chatItem.addEventListener("mouseover", () => {
          chatItem.style.backgroundColor = "#eaeaea";
        });
        chatItem.addEventListener("mouseout", () => {
          chatItem.style.backgroundColor = "#f5f5f5";
        });

        chatItem.appendChild(chatTitle);
        chatItem.appendChild(chatDeleteIcon);
        folderContent.appendChild(chatItem);
      } else {
        console.warn(`[renderFolders] Nenhuma session encontrada para id ${sessionId}.`);
      }
    });

    // Evento de toggle interno: exibe/oculta o conteúdo do folder
    toggleButton.addEventListener("click", () => {
      if (folderContent.style.display === "none") {
        folderContent.style.display = "block";
        toggleButton.innerText = "▲";
        toggleButton.style.transform = "rotate(180deg)";
      } else {
        folderContent.style.display = "none";
        toggleButton.innerText = "▼";
        toggleButton.style.transform = "rotate(0deg)";
      }
    });

    folderHeader.appendChild(titleContainer);
    folderHeader.appendChild(toggleButton);
    folderItem.appendChild(folderHeader);
    folderItem.appendChild(folderContent);
    folderList.appendChild(folderItem);
  });

  // Adiciona o toggle global e a lista de folders ao container
  folderContainer.appendChild(toggleWrapper);
  // Insere a lista de folders...
  folderContainer.appendChild(folderList);

  // ----- Adicionando o resizer para ajustar a altura manualmente -----
  const resizer = document.createElement("div");
  resizer.style.height = "5px";
  resizer.style.background = "#e0e0e0";
  resizer.style.cursor = "row-resize";
  resizer.style.width = "100%";
  // Opcional: adicionar uma transição ou hover para melhorar o visual
  resizer.style.transition = "background 0.2s ease";
  resizer.addEventListener("mouseover", () => resizer.style.background = "#c0c0c0");
  resizer.addEventListener("mouseout", () => resizer.style.background = "#e0e0e0");

  folderContainer.appendChild(resizer);
  // ------------------------------------------------------------------

  console.log("[renderFolders] Adicionando container de folders ao sidebar.");

  // Insere o container de folders como o terceiro filho do sidebar, se houver pelo menos 4 filhos; caso contrário, ao final.
  if (sidebar.children.length >= 4) {
    sidebar.insertBefore(folderContainer, sidebar.children[2]);
    console.log("[renderFolders] Container de folders inserido como terceiro filho.");
  } else {
    sidebar.appendChild(folderContainer);
    console.log("[renderFolders] Sidebar não tem 4 filhos; container de folders adicionado ao final.");
  }

  // ---- Lógica para redimensionar a folderList ----
  resizer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    // Adiciona os event listeners para acompanhar o movimento do mouse
    document.addEventListener("mousemove", resizeFolderList, false);
    document.addEventListener("mouseup", stopResizing, false);
  });

  function resizeFolderList(e) {
    // Calcula a nova altura baseada na posição vertical do mouse
    const rect = folderList.getBoundingClientRect();
    const newHeight = e.clientY - rect.top;
    // Define uma altura mínima (por exemplo, 50px)
    if (newHeight > 50) {
      folderList.style.height = newHeight + "px";
    }
  }

  function stopResizing() {
    document.removeEventListener("mousemove", resizeFolderList, false);
    document.removeEventListener("mouseup", stopResizing, false);
  }
};

export const getDebouncedRenderFolders = async () => {
  const { debounce } = await import(chrome.runtime.getURL('modules/debounce.js'));
  return debounce(renderFolders, 300);
};
