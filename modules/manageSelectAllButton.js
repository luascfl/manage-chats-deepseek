// manageSelectAllButton.js

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

        selectAllButton.addEventListener("click", () => {
          const checkboxes = document.querySelectorAll(".custom-checkbox");
          const selectedSessionIds = [];

          checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
            const title = checkbox.closest(".f9edaa3c").textContent.trim();
            const session = window.sessionIds && window.sessionIds.find((session) => session.title === title);
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
