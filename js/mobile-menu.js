// ハンバーガーメニューの制御
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('show');
  });
}
