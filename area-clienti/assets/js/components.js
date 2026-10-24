/* ============================================================
   DNA HUB — COMPONENTS JS
   Comportamento per: modal, drawer, toast, tab, palette
   API dichiarative via data-*
   ============================================================ */

(function () {
  "use strict";

  // ---------- HELPERS ----------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- FOCUS TRAP ----------
  function trapFocus(container) {
    const focusables = $$(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!focusables.length) return () => {};
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function handler(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    container.addEventListener("keydown", handler);
    return () => container.removeEventListener("keydown", handler);
  }

  // ---------- MODAL ----------
  const Modal = {
    open(id) {
      const backdrop = document.getElementById(id);
      if (!backdrop) return;
      backdrop.classList.add("is-open");
      const dialog = $(".modal", backdrop);
      const previousFocus = document.activeElement;
      const release = dialog ? trapFocus(dialog) : () => {};
      setTimeout(() => {
        const focusable = dialog && $('[autofocus], button, input, select, textarea', dialog);
        if (focusable) focusable.focus();
      }, 50);

      const close = () => {
        backdrop.classList.remove("is-open");
        release();
        if (previousFocus) previousFocus.focus();
      };
      backdrop._close = close;

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) close();
      });
      const escHandler = (e) => {
        if (e.key === "Escape") {
          close();
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);
    },
    close(id) {
      const backdrop = document.getElementById(id);
      if (backdrop && backdrop._close) backdrop._close();
    },
  };

  // ---------- DRAWER ----------
  const Drawer = {
    open(id) {
      const backdrop = document.getElementById(id);
      if (!backdrop) return;
      backdrop.classList.add("is-open");
      const drawer = $(".drawer", backdrop);
      const previousFocus = document.activeElement;
      const release = drawer ? trapFocus(drawer) : () => {};
      if (drawer) drawer.classList.add("is-open");

      const close = () => {
        backdrop.classList.remove("is-open");
        if (drawer) drawer.classList.remove("is-open");
        release();
        if (previousFocus) previousFocus.focus();
      };
      backdrop._close = close;

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) close();
      });
      const escHandler = (e) => {
        if (e.key === "Escape") {
          close();
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);
    },
    close(id) {
      const backdrop = document.getElementById(id);
      if (backdrop && backdrop._close) backdrop._close();
    },
  };

  // ---------- TOAST ----------
  const Toast = {
    show(opts = {}) {
      const { title = "", message = "", variant = "info", duration = 3000 } = opts;
      let stack = $(".toast-stack");
      if (!stack) {
        stack = document.createElement("div");
        stack.className = "toast-stack";
        stack.setAttribute("aria-live", "polite");
        document.body.appendChild(stack);
      }
      const el = document.createElement("div");
      el.className = `toast toast--${variant}`;
      el.setAttribute("role", "status");
      el.innerHTML = `
        <div class="toast__body">
          ${title ? `<div class="toast__title">${title}</div>` : ""}
          ${message ? `<div class="toast__msg">${message}</div>` : ""}
        </div>
        <button class="toast__close" aria-label="Chiudi">×</button>
      `;
      stack.appendChild(el);

      const remove = () => {
        el.style.opacity = "0";
        el.style.transform = "translateX(20px)";
        el.style.transition = "opacity 150ms, transform 150ms";
        setTimeout(() => el.remove(), 150);
      };
      el.querySelector(".toast__close").addEventListener("click", remove);
      if (duration > 0) setTimeout(remove, duration);

      // Max 3 toast
      while (stack.children.length > 3) stack.firstChild.remove();
    },
  };

  // ---------- TABS ----------
  function initTabs(root = document) {
    $$("[data-tabs]", root).forEach((group) => {
      const tabs = $$(".tab", group);
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => activate(tab));
        tab.addEventListener("keydown", (e) => {
          const idx = tabs.indexOf(tab);
          if (e.key === "ArrowRight") {
            e.preventDefault();
            tabs[(idx + 1) % tabs.length].focus();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            tabs[(idx - 1 + tabs.length) % tabs.length].focus();
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate(tab);
          }
        });
      });

      function activate(tab) {
        tabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        const targetId = tab.getAttribute("data-target");
        if (targetId) {
          $$("[data-tab-panel]", group).forEach((p) => {
            p.hidden = p.getAttribute("data-tab-panel") !== targetId;
          });
        }
      }
      const active = tabs.find((t) => t.classList.contains("is-active"));
      if (active) activate(active);
    });
  }

  // ---------- COMMAND PALETTE ----------
  const Palette = {
    open(id = "palette") {
      const backdrop = document.getElementById(id);
      if (!backdrop) return;
      backdrop.classList.add("is-open");
      const input = $(".palette__input", backdrop);
      if (input) setTimeout(() => input.focus(), 50);

      const close = () => {
        backdrop.classList.remove("is-open");
      };
      backdrop._close = close;

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) close();
      });
      const escHandler = (e) => {
        if (e.key === "Escape") {
          close();
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);
    },
    close(id = "palette") {
      const backdrop = document.getElementById(id);
      if (backdrop && backdrop._close) backdrop._close();
    },
  };

  // ---------- GLOBAL SHORTCUT: Ctrl/Cmd+K ----------
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      Palette.open();
    }
  });

  // ---------- DATA ATTRIBUTE BINDINGS ----------
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-modal]");
    if (trigger) {
      Modal.open(trigger.getAttribute("data-open-modal"));
      return;
    }
    const drawerTrigger = e.target.closest("[data-open-drawer]");
    if (drawerTrigger) {
      Drawer.open(drawerTrigger.getAttribute("data-open-drawer"));
      return;
    }
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      Modal.close(closeBtn.getAttribute("data-close-modal"));
      return;
    }
    const closeDrawerBtn = e.target.closest("[data-close-drawer]");
    if (closeDrawerBtn) {
      Drawer.close(closeDrawerBtn.getAttribute("data-close-drawer"));
      return;
    }
    const toastTrigger = e.target.closest("[data-toast]");
    if (toastTrigger) {
      Toast.show({
        title: toastTrigger.getAttribute("data-toast-title") || "",
        message: toastTrigger.getAttribute("data-toast") || "",
        variant: toastTrigger.getAttribute("data-toast-variant") || "info",
      });
    }
  });

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
  });

  // Expose per uso manuale
  window.DNAHub = { Modal, Drawer, Toast, Palette };
})();