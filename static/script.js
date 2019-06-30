window.generatedPolygoon = '';

const button = document.querySelector('#button');
const buttonShare = document.querySelector('#button-share');



function drawInlineSVG(ctx, rawSVG, callback) {
  const svgURL = new XMLSerializer().serializeToString(rawSVG);
  const img = new Image();

  img.onload = function () {
    ctx.drawImage(this, 0, 0);     
    callback();
  };

  img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
}

function generatePNG() {
  const rawSVG = document.querySelector('#svg');
  const canvas = document.querySelector('#canvas');
  const ctxt = canvas.getContext("2d");

  drawInlineSVG(ctxt, rawSVG, function() {
    window.generatedPolygoon = canvas.toDataURL();
    // show share button
    buttonShare.classList.toggle('share-png-show', true);
  });
}

// https://stackoverflow.com/a/35366681
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);
  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

// https://stackoverflow.com/a/45739408
function blobToFile(blob) {
  return new File([blob], 'polygoon.png', {type: 'image/png'});
}

function sharePNG(files) {
  if (navigator.canShare && navigator.canShare( { files: files } )) {
    navigator.share({
      files,
      title: 'Polygoon',
      text: 'I just generated this!',
    })
    .then(() => console.log('Share was successful.'))
    .catch((error) => console.log('Sharing failed', error));
  } else {
    console.log('Your system doesn\'t support sharing files.');
  }
}

button.addEventListener('click', function() {
  generatePNG();
});

buttonShare.addEventListener('click', function() {
  const blob = dataURItoBlob(window.generatedPolygoon);
  const file = blobToFile(blob);
  sharePNG([file]);
});