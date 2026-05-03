(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile navigation */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
      menuToggle.setAttribute("aria-label", open ? "Menü öffnen" : "Menü schließen");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
        menuToggle.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  /* Tabs */
  var tabRoot = document.querySelector("[data-tabs]");
  if (tabRoot) {
    var tabs = tabRoot.querySelectorAll('[role="tab"]');
    var panels = tabRoot.querySelectorAll('[role="tabpanel"]');

    function activateTab(selected) {
      tabs.forEach(function (tab) {
        var on = tab === selected;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", String(on));
      });
      panels.forEach(function (panel) {
        var on = panel.id === selected.getAttribute("aria-controls");
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });
      tab.addEventListener("keydown", function (e) {
        var idx = Array.prototype.indexOf.call(tabs, tab);
        var next = null;
        if (e.key === "ArrowRight") next = tabs[idx + 1] || tabs[0];
        if (e.key === "ArrowLeft") next = tabs[idx - 1] || tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          next.focus();
          activateTab(next);
        }
      });
    });
  }

  /* FAQ accordion */
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    var triggers = accordion.querySelectorAll(".accordion-trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var panelId = trigger.getAttribute("aria-controls");
        var panel = panelId ? document.getElementById(panelId) : null;

        triggers.forEach(function (t) {
          var pid = t.getAttribute("aria-controls");
          var p = pid ? document.getElementById(pid) : null;
          t.setAttribute("aria-expanded", "false");
          if (p) {
            p.hidden = true;
          }
        });

        if (!expanded && panel) {
          trigger.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  /* Wizard - Energie Quick Check */
  var form = document.getElementById("quickcheck-form");
  if (form) {
    var steps = form.querySelectorAll(".wizard-step");
    var dots = form.querySelectorAll(".wizard-dot");
    var stepNumEl = document.getElementById("wizard-step-num");
    var btnBack = document.getElementById("wizard-back");
    var btnSubmit = document.getElementById("wizard-submit");
    var resultEl = document.getElementById("wizard-result");
    var current = 1;

    function showStep(n) {
      current = n;
      steps.forEach(function (step) {
        var sn = Number(step.getAttribute("data-step"));
        var active = sn === current;
        step.classList.toggle("is-active", active);
        step.hidden = !active;
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i < current);
      });
      if (stepNumEl) stepNumEl.textContent = String(current);
      if (btnBack) btnBack.style.display = current === 1 ? "none" : "";
      if (btnSubmit) btnSubmit.style.display = current === 3 ? "" : "none";
    }

    function estimateSaving(consumption, topic) {
      var base = {
        u10: "moderate",
        "10-25": "mittlere",
        "25-50": "gute",
        "50p": "hohe",
      };
      var topicLabel = {
        contracts: "Vertragsoptimierung",
        audit: "Gutachten & Massnahmen",
        pv: "Photovoltaik & Eigenverbrauch",
        mixed: "kombinierte Optimierung",
      };
      var band = base[consumption] || "individuelle";
      var tl = topicLabel[topic] || "Optimierung";
      return (
        "Erste Einordnung: Bei <strong>" +
        band +
        "</strong> Einsparpotenzial durch <strong>" +
        tl +
        "</strong> liegt bei typischen Profilen haeufig im zweistelligen Prozentbereich - konkret nach Datenpruefung."
      );
    }

    showStep(1);

    // Auto-advance when consumption is selected in step 1
    var consumptionInputs = form.querySelectorAll('input[name="consumption"]');
    consumptionInputs.forEach(function (input) {
      input.addEventListener("click", function () {
        setTimeout(function () {
          if (current === 1) {
            showStep(2);
          }
        }, 150);
      });
    });

    // Auto-advance when topic is selected in step 2
    var topicInputs = form.querySelectorAll('input[name="topic"]');
    topicInputs.forEach(function (input) {
      input.addEventListener("click", function () {
        setTimeout(function () {
          if (current === 2) {
            showStep(3);
          }
        }, 150);
      });
    });

    if (btnBack) {
      btnBack.addEventListener("click", function () {
        if (current > 1) showStep(current - 1);
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var consumption = (form.querySelector('input[name="consumption"]:checked') || {}).value;
      var topic = (form.querySelector('input[name="topic"]:checked') || {}).value;
      var email = form.querySelector('input[name="email"]');
      var company = form.querySelector('input[name="company"]');

      if (!consumption || !topic) {
        window.alert("Bitte alle Schritte ausfuellen.");
        return;
      }
      if (!email || !email.value.trim()) {
        window.alert("Bitte geben Sie eine geschaeftliche E-Mail ein.");
        email.focus();
        return;
      }

      var html = estimateSaving(consumption, topic);
      html +=
        "<br><br>Vielen Dank - wir melden uns bei <strong>" +
        email.value.trim() +
        "</strong>" +
        (company && company.value.trim()
          ? " (" + company.value.trim() + ")"
          : "") +
        " innerhalb von 24 Stunden.";

      if (resultEl) {
        resultEl.hidden = false;
        resultEl.innerHTML = html;
        resultEl.focus();
      }

      form.reset();
      showStep(1);
    });
  }

  /* Interest buttons in lead form */
  var interestButtons = document.querySelectorAll(".interest-btn");
  var interesseInput = document.getElementById("interesse-input");
  
  function selectInterest(interestValue) {
    interestButtons.forEach(function (b) {
      b.classList.remove("is-active");
      if (b.getAttribute("data-interest") === interestValue) {
        b.classList.add("is-active");
      }
    });
    if (interesseInput) {
      interesseInput.value = interestValue;
    }
  }
  
  if (interestButtons.length > 0) {
    interestButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectInterest(btn.getAttribute("data-interest"));
      });
    });
  }

  /* Links from services section that select interest */
  var serviceLinks = document.querySelectorAll("[data-select-interest]");
  serviceLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var interest = link.getAttribute("data-select-interest");
      selectInterest(interest);
      
      setTimeout(function () {
        selectInterest(interest);
      }, 100);
    });
  });

  /* Lead form demo submit */
  var leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var interesse = interesseInput ? interesseInput.value : "";
      var interesseText = interesse ? " (Interesse: " + interesse + ")" : "";
      window.alert(
        "Demo: Hier wuerde die Anfrage an Ihr CRM/E-Mail-Backend gesendet." + interesseText + " Felder sind validiert."
      );
    });
  }

  /* Checkliste download */
  var checklistBtn = document.getElementById("checkliste-download");
  if (checklistBtn) {
    checklistBtn.addEventListener("click", function () {
      window.open("checkliste-energievertraege.html", "_blank");
    });
  }

  /* Case PDF button */
  var casePdfBtn = document.getElementById("case-pdf-btn");
  if (casePdfBtn) {
    casePdfBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.alert("Demo: PDF-Fallstudie oder geschuetzter Download-Link einbinden.");
    });
  }

  /* Calendly placeholder */
  document.querySelectorAll("[data-calendly]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.alert(
        "Demo: Hier Calendly-Link oder Buchungswidget einbinden (URL im Code hinterlegen)."
      );
    });
  });

  /* Hide sticky CTA when footer visible */
  var sticky = document.getElementById("sticky-cta");
  var footer = document.querySelector(".site-footer");
  if (sticky && footer && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          sticky.style.opacity = entry.isIntersecting ? "0" : "1";
          sticky.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
        });
      },
      { threshold: 0.05 }
    );
    io.observe(footer);
  }
})();
