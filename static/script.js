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
    // console.log(canvas.toDataURL());
  });
}

const button = document.querySelector('#button');
button.addEventListener('click', function() {
  generatePNG();
});