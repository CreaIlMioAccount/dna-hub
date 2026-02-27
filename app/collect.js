(function () {
  const siteId = document.currentScript.getAttribute("data-site") || "DEFAULT";

  fetch("/api/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site_id: siteId,
      url: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    })
  });
})();
