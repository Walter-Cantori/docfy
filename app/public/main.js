$(document).ready(function() {
  /**
   * Alerts
   */
  setTimeout(function() {
    var alert = document.querySelector('.alert');

    if (alert)
      alert.className += ' alert-hidden';
  }, 3000);

  /**
   * toggle content/form of new documents
   */
  $('#new-section').click(function(){
    $('#content-section').toggle();
    $('#form-section').toggle();
  });

});
