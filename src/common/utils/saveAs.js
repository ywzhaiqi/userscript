function saveAs(data, filename) {
  if(!filename) filename = 'console.json'

  if (typeof data == 'object') {
      data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], { type: 'application/octet-stream' });
  var blobUrl = window.URL.createObjectURL(blob);
  var tmpLink = document.createElement('a');
  tmpLink.href = blobUrl;
  tmpLink.style.display = 'none';
  tmpLink.setAttribute('download', filename);
  tmpLink.setAttribute('target', '_blank')
  document.body.appendChild(tmpLink);

  tmpLink.click();
  document.body.removeChild(tmpLink);
  window.URL.revokeObjectURL(blobUrl);
}

export default saveAs