import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
  })
  .join('');

galleryList.innerHTML = galleryMarkup;

galleryList.addEventListener('click', event => {
  event.preventDefault();

  const clickedElement = event.target;

  if (clickedElement.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = clickedElement.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  const closeOnEscape = event => {
    if (event.key === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', closeOnEscape);
    }
  };

  document.addEventListener('keydown', closeOnEscape);
});
