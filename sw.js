/* De-Rich Foodhub admin - service worker for payment push notifications */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = { body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "New Payment Received!";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      data: { url: new URL("admin.html", self.registration.scope).href },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) ||
    new URL("admin.html", self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.split("#")[0].split("?")[0] === target && "focus" in c) return c.focus();
      }
      return self.clients.openWindow(target);
    })
  );
});