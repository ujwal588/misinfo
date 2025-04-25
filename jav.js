// Sample extension code structure
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "checkContent") {
        // Send content to analysis API
        fetch('https://api.truthguard.com/analyze', {
          method: 'POST',
          body: JSON.stringify({content: request.content})
        })
        .then(response => response.json())
        .then(data => {
          if (data.verdict === "false") {
            // Add warning to page
            chrome.tabs.executeScript(sender.tab.id, {
              code: `addWarningBanner("${data.explanation_url}")`
            });
          }
        });
      }
    }
  );
  
  // Content script to modify pages
  function addWarningBanner(url) {
    const warning = document.createElement('div');
    warning.style = "position: fixed; bottom: 20px; right: 20px; background: #e74c3c; color: white; padding: 15px; border-radius: 5px; z-index: 9999;";
    warning.innerHTML = `
      <p>⚠️ This content has been flagged as potentially misleading</p>
      <a href="${url}" target="_blank" style="color: white; text-decoration: underline;">Learn why</a>
    `;
    document.body.appendChild(warning);
  }