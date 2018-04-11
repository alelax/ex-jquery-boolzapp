var mexSentRowOpen = "<div class='message-row msg-sent'>",
    mexReceivedRowOpen = "<div class='message-row msg-received'>",
    mexBoxOpen = "<div class='message-box'>",
    mexBoxClose = "</div>";
    mexRowClose = "</div>",


$(document).ready(function(){
     // alert("ciao");

   //Recupera il campo di input
   var $thisInput = $('#input-msg');
   var newMessage;
   var now = new Date();

   $('#input-msg').keypress(function(e) {
      //13 = Tasto invio
      if (e.which == 13) {
         newMessage = $thisInput.val();
         if(newMessage) {
            sendMessage(newMessage);
            resetInput($thisInput);
            defaultAnswer();
         }
      }
   });

   $('.send-icon').click(function() {

      var $thisInput = $('#input-msg');
      newMessage = $thisInput.val();
      if(newMessage) {
         sendMessage(newMessage);
         resetInput($thisInput);
         //Viene inserito, dopo un secondo, un messaggio di risposta automatico "ok".
         defaultAnswer();
      }

   });


   var searchContacts = $('#contacts-search');
   var digits = new Array();
   $('#contacts-search').keydown(function(e) {
      var newChar = e.key;
      console.log(newChar);
      if (newChar != "Backspace") {
         digits.push(newChar);
         console.log(digits);
      } else {
         digits.splice(-1, 1); //Il -1 permette di rimuovere l'ultimo elemento dell'array
         console.log(digits);
      }

      $('.chat-with').each(function(){
         // console.log($(this).html());
         var thisContact = $(this).parent().parent().parent();
         console.log(thisContact);
         var currentContact = $(this).html();
         console.log(currentContact);

         var isMatched = isCharachterMatched(currentContact, digits);

         if (!isMatched) {
            thisContact.hide();
         } else {
            thisContact.show();
         }
         // console.log(digits);

      });



   });


   function isCharachterMatched(nameToSearch, charArray) {
      var isCharsConteined = false;
      var noMatchCounter = 0;

      for (var i = 0; i < charArray.length; i++) {
         if ( !(nameToSearch.includes(charArray[i])) ) {
            noMatchCounter++;
         }
      }
      if (noMatchCounter > 0) {
      isCharsConteined = false;
      } else {
      isCharsConteined = true;
      }

      return isCharsConteined;
   }

   //Funzione per l'invio di un messaggio
   function sendMessage(textMessage) {
      //Generea un nuovo messaggio, e lo inserisce alla fine della conversation-area
      if (textMessage) {
         $('.conversation-area').append(
            mexSentRowOpen + mexBoxOpen + textMessage + mexBoxClose + mexRowClose
         );
      }
   }

   //Funzione che resetta il campo input dopo l'invio del messaggio
   function resetInput(inputField) {
      inputField.val('');
   }

   function defaultAnswer() {
      setTimeout(function(){
         $('.conversation-area').append(
            mexReceivedRowOpen + mexBoxOpen + "ok" + mexBoxClose + mexRowClose
         );
      },1000);
   }

});
