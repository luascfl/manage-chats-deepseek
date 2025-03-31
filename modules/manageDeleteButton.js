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
          deleteButton.style.marginBottom = "10px"; // Espaçamento abaixo do botão
          deleteButton.style.width = "85%";

          // Adiciona o evento de clique para deletar as sessões selecionadas
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

          // Cria o botão de avaliação
          const rateButton = document.createElement('a');
          rateButton.href = 'https://chromewebstore.google.com/detail/deep-seek-trash/fbplmblabmmohgmhngphidiebjilbaid/reviews'; // Substitua pelo ID da sua extensão
          rateButton.target = '_blank';
          rateButton.innerText = 'Avaliar Extensão';
          rateButton.style.textDecoration = 'none';
          rateButton.style.color = '#4CAF50'; // Cor verde
          rateButton.style.fontWeight = '500';
          rateButton.style.cursor = 'pointer';
          rateButton.style.textAlign = 'center'; // Centraliza o texto
          rateButton.style.width = '85%'; // Mesma largura do botão "Delete all selected"
          rateButton.style.marginLeft = '8%'; // Mesma margem do botão "Delete all selected"
          rateButton.style.marginBottom = '10px'; // Espaçamento abaixo do botão

          // Adiciona os botões ao DOM
          const controlsContainer = document.querySelector(".controls-container");
          if (controlsContainer) {
              controlsContainer.insertAdjacentElement("afterend", deleteButton);
              // deleteButton.insertAdjacentElement("afterend", rateButton); // Coloca o rateButton abaixo do deleteButton
          }
      }
  } else {
      if (deleteButton) {
          deleteButton.remove();
      }
      const rateButton = document.querySelector(".rate-button");
      if (rateButton) {
          rateButton.remove();
      }
  }
};