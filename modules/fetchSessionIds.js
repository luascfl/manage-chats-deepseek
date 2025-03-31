// fetchSessionIds.js

let sessionIds = [];
let lastFetchTime = 0; // Armazena o tempo da última requisição
const FETCH_INTERVAL = 60 * 1000; // Tempo mínimo entre requisições (60 segundos)

export const fetchSessionIds = async () => {
  const now = Date.now();
  if (now - lastFetchTime < FETCH_INTERVAL) {
    console.log("Ignorando fetchSessionIds para evitar requisições excessivas.");
    return;
  }

  try {
    const tokenData = JSON.parse(localStorage.getItem("userToken"));
    const token = tokenData?.value;

    if (!token) {
      console.error("Bearer token não encontrado no localStorage.");
      return;
    }

    console.log("Fazendo requisição para buscar sessions...");

    const response = await fetch(
      "https://chat.deepseek.com/api/v0/chat_session/fetch_page?count=100",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonData = await response.json();

    if (jsonData.code === 0 && jsonData.data?.biz_data?.chat_sessions) {
      sessionIds = jsonData.data.biz_data.chat_sessions.map((session) => ({
        id: session.id,
        title: session.title,
      }));
      localStorage.setItem("sessionIds", JSON.stringify(sessionIds));

      window.sessionIds = sessionIds;

      lastFetchTime = Date.now();
    } else {
      console.error("Erro ao buscar os sessions:", jsonData.msg);
    }
  } catch (error) {
    console.error("Erro ao fazer o fetch:", error);
  }
};

export const getDebouncedFetchSessionIds = async () => {
  const { debounce } = await import(chrome.runtime.getURL('modules/debounce.js'));
  return debounce(fetchSessionIds, 300);
};
