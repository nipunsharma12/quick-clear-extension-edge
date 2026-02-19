const QUICK_DATA_TO_REMOVE = {
  cookies: true,
  indexedDB: true,
  localStorage: true,
  cacheStorage: true
};

const DEFERRED_DATA_TO_REMOVE = {
  cache: true,
  serviceWorkers: true
};

const BADGE_CLEAR_DELAY_MS = 1500;

function flashBadge(tabId, text, color) {
  chrome.action.setBadgeBackgroundColor({ tabId, color });
  chrome.action.setBadgeText({ tabId, text });

  setTimeout(() => {
    chrome.action.setBadgeText({ tabId, text: "" });
  }, BADGE_CLEAR_DELAY_MS);
}

async function clearQuickData(origin) {
  await chrome.browsingData.remove({ origins: [origin] }, QUICK_DATA_TO_REMOVE);
}

async function clearDeferredData(origin) {
  await chrome.browsingData.remove({ origins: [origin] }, DEFERRED_DATA_TO_REMOVE);
}

chrome.action.onClicked.addListener(async (tab) => {
  try {
    if (!Number.isInteger(tab?.id) || !tab.url) return;

    const url = new URL(tab.url);
    if (url.protocol !== "http:" && url.protocol !== "https:") return;

    flashBadge(tab.id, "...", "#5F6368");
    await clearQuickData(url.origin);
    flashBadge(tab.id, "OK", "#1B873F");
    await chrome.tabs.reload(tab.id, { bypassCache: true });

    clearDeferredData(url.origin).catch((error) => {
      console.error("Deferred clear failed:", error);
    });
  } catch (error) {
    if (Number.isInteger(tab?.id)) {
      flashBadge(tab.id, "ERR", "#B00020");
    }
    console.error("Failed to clear current site data:", error);
  }
});
