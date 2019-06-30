window.giulia = '';

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
    window.giulia = canvas;
    // console.log(canvas.toDataURL());
  });
}

const button = document.querySelector('#button');
button.addEventListener('click', function() {
  generatePNG();
});

// ========
function sharePNG(files) {
  if (navigator.canShare && navigator.canShare( { files } )) {
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

const buttonShare = document.querySelector('#button-share');
buttonShare.addEventListener('click', function() {
  sharePNG([window.giulia]);
});