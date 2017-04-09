export default function copyright(selector) {
  const el = document.querySelector(selector);
  el.innerHTML = `&copy; ${new Date().getFullYear()}`;
}
