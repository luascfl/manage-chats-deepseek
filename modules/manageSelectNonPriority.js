// manageSelectNonPriority.js

export const manageSelectNonPriority = (isActive) => {
    let selectNonPriorityButton = document.querySelector(".select-non-priority-button");

    if (isActive) {
      if (!selectNonPriorityButton) {
        selectNonPriorityButton = document.createElement("button");
        selectNonPriorityButton.className = "select-non-priority-button";
        selectNonPriorityButton.innerText = "Selecionar não prioritários";
        selectNonPriorityButton.style.padding = "10px 20px";
        selectNonPriorityButton.style.marginTop = "-9px";
        selectNonPriorityButton.style.fontSize = "16px";
        selectNonPriorityButton.style.backgroundColor = "#007bff";
        selectNonPriorityButton.style.color = "#fff";
        selectNonPriorityButton.style.border = "none";
        selectNonPriorityButton.style.borderRadius = "5px";
        selectNonPriorityButton.style.cursor = "pointer";
        selectNonPriorityButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        selectNonPriorityButton.style.marginLeft = "8%";
        selectNonPriorityButton.style.marginBottom = "5%";
        selectNonPriorityButton.style.width = "85%";

        selectNonPriorityButton.addEventListener("click", () => {
          const checkboxes = document.querySelectorAll(".custom-checkbox");
          const selectedSessionIds = [];

          checkboxes.forEach((checkbox) => {
            const chatElement = checkbox.closest(".f9edaa3c");
            if (!chatElement) return;
            
            const title = chatElement.textContent.trim();
            
            if (!title.includes("❗")) {
              checkbox.checked = true;
              
              // Procura a sessão de forma mais robusta
              const session = window.sessionIds && window.sessionIds.find(session => {
                // Remove espaços extras e compara os títulos normalizados
                const normalizedTitle = title.replace(/\s+/g, ' ').trim();
                const normalizedSessionTitle = session.title.replace(/\s+/g, ' ').trim();
                return normalizedTitle === normalizedSessionTitle;
              });

              if (session && !selectedSessionIds.includes(session.id)) {
                selectedSessionIds.push(session.id);
              } else {
                console.log('Sessão não encontrada para o título:', title);
              }
            }
          });

          // Combina com as sessões já selecionadas
          const existingSelectedIds = JSON.parse(localStorage.getItem("selectedSessionIds")) || [];
          const allSelectedIds = [...new Set([...existingSelectedIds, ...selectedSessionIds])];
          
          localStorage.setItem("selectedSessionIds", JSON.stringify(allSelectedIds));
        });

        // Insere o botão após o Select all
        const selectAllButton = document.querySelector(".select-all-button");
        if (selectAllButton) {
          selectAllButton.insertAdjacentElement("afterend", selectNonPriorityButton);
        } else {
          const deleteButton = document.querySelector(".delete-selected-button");
          if (deleteButton) {
            deleteButton.insertAdjacentElement("beforebegin", selectNonPriorityButton);
          }
        }
      }
    } else {
      if (selectNonPriorityButton) {
        selectNonPriorityButton.remove();
      }
    }
};
