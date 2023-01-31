import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';

const imagesContainer = document.querySelector('.gallery');
const imagesMarkup = creatImageList(galleryItems);
imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);

function creatImageList(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`;
    })
    .join('');
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionPosition: `bottom`,
  captionDelay: 250,
});

console.log(galleryItems);
