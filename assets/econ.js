/* ============================================================
   EconLearn 共享交互脚本 · 所有分支教程统一引用
   引用方式: <script src="../assets/econ.js"></script> (放在 </body> 前)
   提供并自动初始化:
     1. 阅读进度条  (.reading-progress)
     2. 目录滚动高亮 (.sidebar a + .chapter)
     3. 测验即时反馈 (.quiz 结构见 DESIGN_SPEC.md)
     4. 移动端目录抽屉 (.toc-toggle + .sidebar)
   页面自有的图表交互脚本写在页面内 <script> 中即可。
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. 阅读进度条 ---------- */
  function initProgress() {
    var bar = document.querySelector(".reading-progress");
    if (!bar) return;
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 2. 目录滚动高亮(scrollspy) ---------- */
  function initSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".sidebar a[href^='#']")
    );
    if (!links.length) return;
    var sections = links
      .map(function (a) {
        return document.getElementById(a.getAttribute("href").slice(1));
      })
      .filter(Boolean);
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }

    if ("IntersectionObserver" in window) {
      var visible = {};
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
          });
          var best = null, bestRatio = 0;
          sections.forEach(function (s) {
            var r = visible[s.id] || 0;
            if (r > bestRatio) { bestRatio = r; best = s; }
          });
          if (best) setActive(best.id);
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
      );
      sections.forEach(function (s) { io.observe(s); });
    } else {
      // 降级: 滚动时取距顶部最近的章节
      window.addEventListener(
        "scroll",
        function () {
          var pos = window.scrollY + window.innerHeight * 0.3;
          var current = sections[0];
          sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
          if (current) setActive(current.id);
        },
        { passive: true }
      );
    }
  }

  /* ---------- 3. 测验即时反馈(可重做) ---------- */
  function initQuiz() {
    document.querySelectorAll("[data-quiz]").forEach(function (quiz) {
      var opts = Array.prototype.slice.call(
        quiz.querySelectorAll(".quiz-opt")
      );
      var verdict = quiz.querySelector(".quiz-verdict");
      var explain = quiz.querySelector(".quiz-explain");
      var done = false;
      var retry = null;

      function reset() {
        done = false;
        opts.forEach(function (o) {
          o.disabled = false;
          o.classList.remove("correct", "wrong", "dimmed");
          o.querySelectorAll(".v-mark").forEach(function (m) {
            if (m.parentNode) m.parentNode.removeChild(m);
          });
        });
        if (verdict) {
          verdict.textContent = "";
          verdict.classList.remove("show", "v-ok", "v-err");
        }
        if (explain) explain.classList.remove("show");
        if (retry && retry.parentNode) retry.parentNode.removeChild(retry);
        retry = null;
        if (opts.length) opts[0].focus();
      }

      function answer(opt) {
        var isRight = opt.getAttribute("data-correct") === "true";
        opts.forEach(function (o) {
          o.disabled = true;
          if (o.getAttribute("data-correct") === "true") {
            o.classList.add("correct");
            o.insertAdjacentHTML(
              "beforeend",
              ' <span class="v-mark" aria-hidden="true">&#10003; 正确</span>'
            );
          } else if (o === opt) {
            o.classList.add("wrong");
            o.insertAdjacentHTML(
              "beforeend",
              ' <span class="v-mark" aria-hidden="true">&#10007; 你的选择</span>'
            );
          } else {
            o.classList.add("dimmed");
          }
        });
        if (verdict) {
          verdict.textContent = isRight
            ? "\u2713 回答正确！"
            : "\u2717 不对哦，看看下面的解析。";
          verdict.classList.add("show");
          verdict.classList.toggle("v-ok", isRight);
          verdict.classList.toggle("v-err", !isRight);
        }
        if (explain) explain.classList.add("show");
        retry = document.createElement("button");
        retry.type = "button";
        retry.className = "quiz-retry";
        retry.textContent = "重做一遍";
        retry.addEventListener("click", reset);
        quiz.appendChild(retry);
      }

      opts.forEach(function (opt) {
        opt.addEventListener("click", function () {
          if (done) return;
          done = true;
          answer(opt);
        });
      });
    });
  }

  /* ---------- 4. 移动端目录抽屉 ---------- */
  function initToc() {
    var toggle = document.querySelector(".toc-toggle");
    var sidebar = document.querySelector(".sidebar");
    if (!toggle || !sidebar) return;
    toggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        sidebar.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- 5. 小工具: 便捷DOM/格式化(页面内联脚本可用) ---------- */
  window.Econ = {
    $: function (sel, root) { return (root || document).querySelector(sel); },
    $$: function (sel, root) {
      return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    },
    fmt: function (x, d) {
      return Number(x).toLocaleString("zh-CN", {
        minimumFractionDigits: d == null ? 2 : d,
        maximumFractionDigits: d == null ? 2 : d,
      });
    },
    /* 给SVG文本设置内容 */
    setTxt: function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    initProgress();
    initSpy();
    initQuiz();
    initToc();
  });
})();
