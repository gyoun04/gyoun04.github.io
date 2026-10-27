const pages = [...document.querySelectorAll('.portfolio-page')];
const pageSelect = document.querySelector('#page-select');

pageSelect.addEventListener('change', () => {
  document.getElementById(`page-${pageSelect.value}`)?.scrollIntoView({ block: 'start' });
});

let scheduled = false;
function updateCurrentPage() {
  const readingLine = window.innerHeight * 0.3;
  let current = 1;
  for (const [index, page] of pages.entries()) {
    if (page.getBoundingClientRect().top <= readingLine) current = index + 1;
    else break;
  }
  if (document.activeElement !== pageSelect) pageSelect.value = String(current);
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateCurrentPage);
  }
}, { passive: true });
window.addEventListener('resize', updateCurrentPage);
window.addEventListener('pageshow', updateCurrentPage);
updateCurrentPage();
