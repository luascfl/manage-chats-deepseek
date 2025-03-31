// manageArchiveButton.js

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
        archiveButton.style.display = "none";

        // Adiciona o evento de clique para arquivar as sessões selecionadas
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
