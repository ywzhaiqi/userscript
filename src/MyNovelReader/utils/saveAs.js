function saveAs(data, filename) {
  if(!filename) filename = 'console.json'

  if (typeof data == 'object') {
      data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], { type: 'application/octet-stream' });
  var url = window.URL.createObjectURL(blob);
  var saveas = document.createElement('a');
  saveas.href = url;
  saveas.style.display = 'none';
  document.body.appendChild(saveas);
  saveas.download = filename;
  saveas.click();
  setTimeout(function() {
      saveas.parentNode.removeChild(saveas);
  }, 1000)
  document.addEventListener('unload', function() {
      window.URL.revokeObjectURL(url);
  });
}

export default saveAs