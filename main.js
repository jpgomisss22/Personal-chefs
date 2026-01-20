"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) {
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  const closeItem = (item) => {
    const panel = item.querySelector(".faq-panel");
    const button = item.querySelector(".faq-question");
    item.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
    panel.style.opacity = "0";
  };

  const openItem = (item) => {
    const panel = item.querySelector(".faq-panel");
    const button = item.querySelector(".faq-question");
    item.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    panel.style.opacity = "1";
  };

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      faqItems.forEach((other) => {
        if (other !== item) {
          closeItem(other);
        }
      });
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  if (faqItems.length > 0) {
    openItem(faqItems[0]);
  }

  window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
      if (item.classList.contains("is-open")) {
        const panel = item.querySelector(".faq-panel");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  const hoverTargets = document.querySelectorAll("[data-hover]");
  hoverTargets.forEach((target) => {
    const addHover = () => target.classList.add("is-hovered");
    const removeHover = () => target.classList.remove("is-hovered");

    target.addEventListener("mouseenter", addHover);
    target.addEventListener("mouseleave", removeHover);
    target.addEventListener("focus", addHover);
    target.addEventListener("blur", removeHover);
  });
});