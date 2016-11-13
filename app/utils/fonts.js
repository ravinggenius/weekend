import FontFaceObserver from 'fontfaceobserver';

export function observeFont(name, options = {}) {
  const className = `font-${name.replace(' ', '-')}`;

  return new FontFaceObserver(name, options).load().then(() => {
    document.body.classList.add(className);
  }, () => {
    document.body.classList.remove(className);
  });
}
