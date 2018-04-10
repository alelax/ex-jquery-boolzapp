$(document).ready(function(){
   // alert("ciao");
   $('.send-icon').click(function() {

      //Recupera il messaggio dall'input
      var $messageSent = $('#input-msg').val();
      console.log($messageSent);

      //Generea un nuovo messaggio, e lo inserisce alla fine della conversation-area
      $('.conversation-area').append(
         "<div class='message-row msg-sent'>"
       +    "<div class='message-box'>"
       +       $messageSent
       +    "</div>"
       + "</div>"  );

      //Viene inserito un messaggio di risposta automatico "ok".
      setTimeout(function(){
         $('.conversation-area').append(
            "<div class='message-row msg-received'>"
          +    "<div class='message-box'>"
          +       "ok"
          +    "</div>"
          + "</div>"  );
      },1000);


   })


});
