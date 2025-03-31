export const addFolderButton = () => {
  const controlsContainer = document.querySelector(".controls-container");
  if (!controlsContainer) return;

  // Verifica se o toggle de multi‑ação está habilitado (presume que o toggle está dentro de um elemento com a classe "toggle-switch")
  const toggleInput = controlsContainer.querySelector(".toggle-switch input");
  if (!toggleInput || !toggleInput.checked) {
    // Se o toggle não estiver habilitado, remove o botão "Add to Folder", se existir
    const existingButton = document.querySelector(".add-folder-button");
    if (existingButton) {
      existingButton.remove();
    }
    return;
  }

  // Se o botão já existe, não cria novamente.
  if (!document.querySelector(".add-folder-button")) {
    const folderButton = document.createElement("button");
    folderButton.className = "add-folder-button";
    folderButton.innerText = "📁 Add to Folder";
    folderButton.style.padding = "10px 20px";
    folderButton.style.fontSize = "16px";
    folderButton.style.backgroundColor = "#007bff";
    folderButton.style.color = "#fff";
    folderButton.style.border = "none";
    folderButton.style.borderRadius = "5px";
    folderButton.style.cursor = "pointer";
    folderButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    folderButton.style.marginBottom = "10px";
    folderButton.style.width = "85%";
    folderButton.style.marginLeft = "8%";
    folderButton.style.marginRight = "8%"; // Para melhor espaçamento lateral

    folderButton.addEventListener("click", () => {
      const selectedSessionIds = JSON.parse(localStorage.getItem("selectedSessionIds")) || [];
      if (selectedSessionIds.length === 0) {
        alert("Nenhuma sessão selecionada para adicionar à pasta.");
        return;
      }

      const folderName = prompt("Digite o nome da pasta:");
      if (!folderName) return;

      let folders = JSON.parse(localStorage.getItem("folders")) || {};
      if (!folders[folderName]) {
        folders[folderName] = [];
      }
      // Une os IDs selecionados com os já existentes, evitando duplicatas
      folders[folderName] = [...new Set([...folders[folderName], ...selectedSessionIds])];
      localStorage.setItem("folders", JSON.stringify(folders));

      alert(`Sessões adicionadas à pasta "${folderName}".`);
      // Re-renderiza os folders usando dynamic import para chamar a função renderFolders do módulo
      import(chrome.runtime.getURL('modules/renderFolders.js'))
        .then(module => {
          module.renderFolders();
        })
        .catch(err => {
          console.error("Erro ao re-renderizar os folders:", err);
        });
    });

    // Insere o botão dentro do container de controles, após os demais botões (por exemplo, logo após o botão de Archive ou Delete)
    // Aqui, você pode ajustar conforme a ordem desejada.
    const archiveButton = document.querySelector(".archive-selected-button");
    if (archiveButton) {
      archiveButton.insertAdjacentElement("afterend", folderButton);
    } else {
      const deleteButton = document.querySelector(".delete-selected-button");
      if (deleteButton) {
        deleteButton.insertAdjacentElement("afterend", folderButton);
      } else {
        controlsContainer.appendChild(folderButton);
      }
    }
  }
};
