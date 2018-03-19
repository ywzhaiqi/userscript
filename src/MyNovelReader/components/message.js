
let $messageDiv;
let _messageTimeId;

function notice(html, duration, noticeType, onClose) {
  if (typeof duration === 'undefined')
      duration = 2000;

  var closeMessage = function() {
      $messageDiv.remove();
      $messageDiv = null;

      if (typeof onClose === 'function') {
          onClose();
      }
  };

  if (!$messageDiv) {
      var iconHtml = ''
      if (noticeType === 'loading') {
          iconHtml = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
      }

      $messageDiv = $('<div id="message" class="noRemove">' + iconHtml + '<span id="content"></span></div>')
          .appendTo('body');

      if (duration == 0) {
          $messageDiv.on('click', closeMessage);
      }
  }

  $messageDiv.find('#content').html(html)

  if (duration > 0) {
      clearTimeout(_messageTimeId);
      _messageTimeId = setTimeout(closeMessage, duration)
  }
}

export function loading(html, duration, onClose) {
  notice(html, duration, 'loading', onClose)
}
