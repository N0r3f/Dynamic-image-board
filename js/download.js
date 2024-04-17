function downloadImage(imgSrc) {
    const downloadLink = document.createElement('a');
    downloadLink.href = imgSrc;
    downloadLink.download = '';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

