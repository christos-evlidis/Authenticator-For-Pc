/** Sends a scan action message to the content script in a tab. */
async function messageContent(tabId, action) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { action });

    return { ok: true, response };
  } catch (error) {
    console.warn("[scan-message] messageContent failed", error);

    const message =
      error instanceof Error ? error.message : String(error ?? "");

    return {
      ok: false,
      error,
      receivingEndMissing: message.includes("Receiving end does not exist"),
    };
  }
}

export { messageContent };
