document.addEventListener("DOMContentLoaded", function() {

  const themeToggle = document.getElementById("theme");
  themeToggle.addEventListener("change", switchTheme, false);

  function switchTheme(e) {
    if (e.target.checked) {
      return document.documentElement.setAttribute("data-theme", "dark");
    }
    document.documentElement.setAttribute("data-theme", "light");
  }

});
