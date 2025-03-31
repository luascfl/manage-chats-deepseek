// toggleCheckboxes.js

// Carregamos dinamicamente os módulos de gerenciamento
export const toggleCheckboxes = async (isActive) => {
  const { manageDeleteButton } = await import(chrome.runtime.getURL('modules/manageDeleteButton.js'));
  const { manageArchiveButton } = await import(chrome.runtime.getURL('modules/manageArchiveButton.js'));
  const { manageSelectAllButton } = await import(chrome.runtime.getURL('modules/manageSelectAllButton.js'));
  const { manageSelectNonPriority } = await import(chrome.runtime.getURL('modules/manageSelectNonPriority.js'));

  const elements = document.querySelectorAll(".f9edaa3c");

  elements.forEach((element) => {
    if (isActive) {
      if (!element.querySelector(".custom-checkbox")) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "custom-checkbox";
        checkbox.style.marginRight = "10px";

        checkbox.addEventListener("change", () => {
          const title = element.textContent.trim();
          const session = window.sessionIds && window.sessionIds.find((session) => session.title === title);
          if (session) {
            const selectedSessionIds = JSON.parse(localStorage.getItem("selectedSessionIds")) || [];
            if (checkbox.checked) {
              if (!selectedSessionIds.includes(session.id)) {
                selectedSessionIds.push(session.id);
              }
            } else {
              const index = selectedSessionIds.indexOf(session.id);
              if (index > -1) {
                selectedSessionIds.splice(index, 1);
              }
            }
            localStorage.setItem("selectedSessionIds", JSON.stringify(selectedSessionIds));
          }
        });

        element.insertAdjacentElement("afterbegin", checkbox);
      }
    } else {
      const checkbox = element.querySelector(".custom-checkbox");
      if (checkbox) checkbox.remove();
    }
  });

  manageDeleteButton(isActive);
  manageArchiveButton(isActive);
  manageSelectAllButton(isActive);
  manageSelectNonPriority(isActive);

};
