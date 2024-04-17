const gallery = document.getElementById('gallery');
const images = []; // Tableau pour stocker les URLs des images

// Récupère la liste des fichiers dans le dossier /img
fetch('./media/originales/')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const links = doc.querySelectorAll('a');

        links.forEach((link, index) => {
            const imgName = link.textContent;
            const imgUrl = link.href;
            const miniatureUrl = imgUrl.replace('/media/originales/', '/media/miniatures/').replace(/\.[^/.]+$/, ".webp"); // Remplace l'extension par .webp

            // Vérifie si l'URL se termine par une extension d'image valide
            const imageExtensionRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
            if (!imageExtensionRegex.test(imgUrl)) {
                // Si l'URL n'est pas une image, ne fait rien et passe à la suivante
                return;
            }

            // Crée un conteneur pour chaque image
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            // Crée l'image miniature
            const img = document.createElement('img');
            img.src = miniatureUrl; // Utilise l'image du dossier /miniatures
            img.classList.add('preview');
            img.onclick = function () {
                // Appel à la fonction openLightbox du script de la lightbox
                openLightbox(imgUrl);
            };
            imageContainer.appendChild(img);

            // Crée le bouton de téléchargement
            const downloadBtn = document.createElement('button');
            downloadBtn.classList.add('download-btn');
            downloadBtn.textContent = 'Télécharger';
            downloadBtn.onclick = function () {
                // Appel à la fonction downloadImage du script de téléchargement
                downloadImage(imgUrl);
            };
            imageContainer.appendChild(downloadBtn);

            // Ajoute le conteneur à la galerie
            gallery.appendChild(imageContainer);

            // Cache les trois premiers .image-container
            if (index < 4) {
                imageContainer.style.display = 'none';
            }

            // Ajoute l'URL de l'image au tableau
            images.push(imgUrl);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des images:', error));

