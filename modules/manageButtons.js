// Função para gerenciar o botão "Delete all selected"
export const manageDeleteButton = (isActive) => {
    let deleteButton = document.querySelector(".delete-selected-button");

    if (isActive) {
      if (!deleteButton) {
        // Cria o botão "Delete all selected"
        deleteButton = document.createElement("button");
        deleteButton.className = "delete-selected-button";
        deleteButton.innerText = "Delete all selected";
        deleteButton.style.padding = "10px 20px";
        deleteButton.style.marginTop = "-9px";
        deleteButton.style.fontSize = "16px";
        deleteButton.style.backgroundColor = "#dc3545";
        deleteButton.style.color = "#fff";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        deleteButton.style.marginLeft = "8%";
        deleteButton.style.marginBottom = "5%";
        deleteButton.style.width = "85%";

        // Adiciona o evento de clique para deletar os IDs selecionados
        deleteButton.addEventListener("click", async () => {
          const selectedSessionIds = JSON.parse(localStorage.getItem("selectedSessionIds")) || [];

          if (selectedSessionIds.length === 0) {
            alert("Nenhuma sessão selecionada para deletar.");
            return;
          }

          const tokenData = JSON.parse(localStorage.getItem("userToken"));
          const token = tokenData?.value;

          if (!token) {
            console.error("Bearer token não encontrado no localStorage.");
            alert("Erro: Token de autenticação não encontrado.");
            return;
          }

          try {
            for (const sessionId of selectedSessionIds) {
              const response = await fetch(
                "https://chat.deepseek.com/api/v0/chat_session/delete",
                {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    chat_session_id: sessionId,
                  }),
                }
              );

              const result = await response.json();

              if (!response.ok || result.code !== 0) {
                console.error(`Erro ao deletar a sessão ${sessionId}:`, result.msg);
                alert(`Erro ao deletar a sessão com ID: ${sessionId}.`);
                continue;
              }
            }

            alert("Sessões deletadas com sucesso!");
            localStorage.setItem("selectedSessionIds", JSON.stringify([]));

            const checkboxes = document.querySelectorAll(".custom-checkbox:checked");
            checkboxes.forEach((checkbox) => {
              const parent = checkbox.closest(".f9edaa3c");
              if (parent) parent.remove();
            });
          } catch (error) {
            console.error("Erro ao fazer o POST para deletar as sessões:", error);
            alert("Erro de comunicação com o servidor. Por favor, tente novamente.");
          }
        });

        const controlsContainer = document.querySelector(".controls-container");
        if (controlsContainer) {
          controlsContainer.insertAdjacentElement("afterend", deleteButton);
        }
      }
    } else {
      if (deleteButton) {
        deleteButton.remove();
      }
    }
  };

  // Função para gerenciar o botão "Archive all selected"
  export const manageArchiveButton = (isActive) => {
    let archiveButton = document.querySelector(".archive-selected-button");

    if (isActive) {
      if (!archiveButton) {
        // Cria o botão "Archive all selected"
        archiveButton = document.createElement("button");
        archiveButton.className = "archive-selected-button";
        archiveButton.innerText = "Archive all selected";
        archiveButton.style.padding = "10px 20px";
        archiveButton.style.marginTop = "-8px";
        archiveButton.style.fontSize = "16px";
        archiveButton.style.backgroundColor = "#6c757d";
        archiveButton.style.color = "#fff";
        archiveButton.style.border = "none";
        archiveButton.style.borderRadius = "5px";
        archiveButton.style.cursor = "pointer";
        archiveButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        archiveButton.style.marginLeft = "8%";
        archiveButton.style.marginBottom = "5%";
        archiveButton.style.width = "85%";

        // Adiciona o evento de clique para arquivar os IDs selecionados
        archiveButton.addEventListener("click", async () => {
          const selectedSessionIds = JSON.parse(localStorage.getItem("selectedSessionIds")) || [];

          if (selectedSessionIds.length === 0) {
            alert("Nenhuma sessão selecionada para arquivar.");
            return;
          }

          const tokenData = JSON.parse(localStorage.getItem("userToken"));
          const token = tokenData?.value;

          if (!token) {
            console.error("Bearer token não encontrado no localStorage.");
            alert("Erro: Token de autenticação não encontrado.");
            return;
          }

          try {
            for (const sessionId of selectedSessionIds) {
              const response = await fetch(
                "https://chat.deepseek.com/api/v0/chat_session/archive",
                {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    chat_session_id: sessionId,
                  }),
                }
              );

              const result = await response.json();

              if (!response.ok || result.code !== 0) {
                console.error(`Erro ao arquivar a sessão ${sessionId}:`, result.msg);
                alert(`Erro ao arquivar a sessão com ID: ${sessionId}.`);
                continue;
              }
            }

            alert("Sessões arquivadas com sucesso!");
            localStorage.setItem("selectedSessionIds", JSON.stringify([]));

            const checkboxes = document.querySelectorAll(".custom-checkbox:checked");
            checkboxes.forEach((checkbox) => {
              const parent = checkbox.closest(".f9edaa3c");
              if (parent) parent.remove();
            });
          } catch (error) {
            console.error("Erro ao fazer o POST para arquivar as sessões:", error);
            alert("Erro de comunicação com o servidor. Por favor, tente novamente.");
          }
        });

        const deleteButton = document.querySelector(".delete-selected-button");
        if (deleteButton) {
          deleteButton.insertAdjacentElement("afterend", archiveButton);
        }
      }
    } else {
      if (archiveButton) {
        archiveButton.remove();
      }
    }
  };

  // Função para gerenciar o botão "Select all"
  export const manageSelectAllButton = (isActive) => {
    let selectAllButton = document.querySelector(".select-all-button");

    if (isActive) {
      if (!selectAllButton) {
        // Cria o botão "Select all"
        selectAllButton = document.createElement("button");
        selectAllButton.className = "select-all-button";
        selectAllButton.innerText = "Select all";
        selectAllButton.style.padding = "10px 20px";
        selectAllButton.style.marginTop = "-9px";
        selectAllButton.style.fontSize = "16px";
        selectAllButton.style.backgroundColor = "#007bff";
        selectAllButton.style.color = "#fff";
        selectAllButton.style.border = "none";
        selectAllButton.style.borderRadius = "5px";
        selectAllButton.style.cursor = "pointer";
        selectAllButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        selectAllButton.style.marginLeft = "8%";
        selectAllButton.style.marginBottom = "5%";
        selectAllButton.style.width = "85%";

        // Adiciona o evento de clique para selecionar todas as sessões
        selectAllButton.addEventListener("click", () => {
          const checkboxes = document.querySelectorAll(".custom-checkbox");
          const selectedSessionIds = [];

          checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
            const title = checkbox.closest(".f9edaa3c").textContent.trim();
            const session = sessionIds.find((session) => session.title === title);

            if (session && !selectedSessionIds.includes(session.id)) {
              selectedSessionIds.push(session.id);
            }
          });

          localStorage.setItem("selectedSessionIds", JSON.stringify(selectedSessionIds));
        });

        const deleteButton = document.querySelector(".delete-selected-button");
        if (deleteButton) {
          deleteButton.insertAdjacentElement("beforebegin", selectAllButton);
        }
      }
    } else {
      if (selectAllButton) {
        selectAllButton.remove();
      }
    }
  };