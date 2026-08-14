(() => {
  document.querySelectorAll('[style*="opacity:0"]').forEach((node) => {
    node.style.opacity = "1";
    node.style.transform = "none";
  });
  document.querySelectorAll('[style*="filter:blur(8px)"]').forEach((node) => {
    node.style.filter = "none";
  });

  const menuButton = document.querySelector('button[aria-label="Toggle navigation"]');
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      let menu = document.getElementById("recovered-mobile-menu");
      if (!menu) {
        menu = document.createElement("div");
        menu.id = "recovered-mobile-menu";
        menu.className = "premium-surface mx-4 mt-2 grid gap-1 rounded-[16px] p-3 text-white md:hidden";
        menu.innerHTML = '<a class="rounded-xl px-4 py-3" href="/services">Services</a><a class="rounded-xl px-4 py-3" href="/events">Events</a><a class="rounded-xl px-4 py-3" href="/community">Community</a><a class="rounded-xl px-4 py-3" href="/about">About us</a>';
        menuButton.closest("header").append(menu);
      }
      menu.hidden = open;
    });
  }

  document.querySelectorAll(".event-gallery-card").forEach((card) => {
    const label = card.getAttribute("aria-label") || "";
    if (label.includes("Abuja Homecoming")) card.addEventListener("click", () => location.assign("/events/abuja-homecoming"));
    if (label.includes("Batch B1")) card.addEventListener("click", () => location.assign("/events/freed-at-last-batch-b1-pop-party"));
    if (label.includes("Batch B2")) card.addEventListener("click", () => location.assign("/events/batch-b2-pop-party-akure"));
  });

  if (location.pathname === "/events/batch-b2-pop-party-akure") {
    const form = document.querySelector("#tickets form");
    if (form) {
      const submit = [...form.querySelectorAll("button")].find((button) => button.textContent.includes("Pay with Paystack"));
      if (submit) {
        submit.type = "submit";
        submit.disabled = false;
        submit.textContent = "Pay ₦3,000";
      }
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const inputs = [...form.querySelectorAll("input")];
        const [name, email, phone] = inputs.map((input) => input.value.trim());
        const errorBox = document.getElementById("payment-error") || document.createElement("p");
        errorBox.id = "payment-error";
        errorBox.className = "mt-4 text-sm font-semibold text-red-700";
        if (!errorBox.parentNode && submit) submit.before(errorBox);
        if (!name || !email.includes("@") || !phone) { errorBox.textContent = "Please enter your name, email address, and phone number."; return; }
        submit.disabled = true;
        submit.textContent = "Opening secure payment…";
        try {
          const result = await fetch("/api/payments/initialize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, quantity: 1, eventSlug: "batch-b2-pop-party-akure" }) });
          const data = await result.json();
          if (!result.ok || !data.authorizationUrl) throw new Error(data.error || "Payment could not be started.");
          location.assign(data.authorizationUrl);
        } catch (error) {
          errorBox.textContent = error.message;
          submit.disabled = false;
          submit.textContent = "Pay ₦3,000";
        }
      });
    }
  }
})();
