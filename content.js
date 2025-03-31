// content.js

console.log("Minha extensão está rodando!");

(async () => {
  const { toggleCheckboxes } = await import(chrome.runtime.getURL('modules/toggleCheckboxes.js'));
  const { addCustomControls } = await import(chrome.runtime.getURL('modules/addCustomControls.js'));
  const { renderFolders, getDebouncedRenderFolders } = await import(chrome.runtime.getURL('modules/renderFolders.js'));
  const { fetchSessionIds, getDebouncedFetchSessionIds } = await import(chrome.runtime.getURL('modules/fetchSessionIds.js'));
  const { addFolderButton } = await import(chrome.runtime.getURL('modules/addFolderButton.js'));

  const debouncedFetchSessionIds = await getDebouncedFetchSessionIds();

  const observer = new MutationObserver((mutationsList) => {
    let shouldRun = false;
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        shouldRun = true;
        break;
      }
    }
    if (shouldRun) {
      addCustomControls();
      addFolderButton();
      debouncedFetchSessionIds();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  addCustomControls();
  addFolderButton();

  fetchSessionIds().then(() => {
    renderFolders();
  });
})();
