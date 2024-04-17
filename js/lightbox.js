
let currentImageIndex = 0;

function openLightbox(imgSrc) {
    const lightboxImageUrl = imgSrc.replace('/media/originales/', '/media/lightbox/').replace(/\.[^/.]+$/, ".webp");
    document.getElementById('modalImage').src = lightboxImageUrl;
    let lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    currentImageIndex = images.indexOf(lightboxImageUrl);

    // Créer le bouton de téléchargement
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Télécharger l\'image originale';
    downloadButton.classList.add('lightboxButton');

    // Ajouter le bouton à la lightbox
    lightbox.appendChild(downloadButton);

    // Mettre à jour l'URL de l'image originale dans le bouton de téléchargement
    updateDownloadButton(imgSrc);
}

function updateDownloadButton(imgSrc) {
    const downloadButton = document.getElementById('lightbox').querySelector('button');
    const originalImageUrl = imgSrc.replace('/media/lightbox/', '/media/originales/');
    downloadButton.onclick = function () {
        window.open(originalImageUrl, '_blank');
    };
}

function closeLightbox() {
    let lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    lightbox.style.top = '0';
}

function changeImage(direction) {
    currentImageIndex += direction;
    // Si on dépasse le dernier élément, on revient au début
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    // Utilisez la même logique que dans openLightbox pour obtenir l'URL de la version WebP de l'image
    const lightboxImageUrl = images[currentImageIndex].replace('/media/originales/', '/media/lightbox/').replace(/\.[^/.]+$/, ".webp");
    document.getElementById('modalImage').src = lightboxImageUrl;

    // Mettre à jour l'URL de l'image originale dans le bouton de téléchargement
    updateDownloadButton(images[currentImageIndex]);
}


document.getElementById('prevImage').addEventListener('click', function () {
    changeImage(-1);
});

document.getElementById('nextImage').addEventListener('click', function () {
    changeImage(1);
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        // Si on est sur la première image, passe à la dernière
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        // Si on est sur la dernière image, passe à la première
        currentImageIndex = (currentImageIndex + 1) % images.length;
        changeImage(1);
    } else if (event.key === 'Escape') {
        closeLightbox();
    }
});

document.getElementById('lightbox').addEventListener('click', function (event) {
    if (event.target === this) {
        closeLightbox();
    }
});
