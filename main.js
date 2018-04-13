var mexSentRowOpen = "<div class='message-row msg-sent'>",
    mexReceivedRowOpen = "<div class='message-row msg-received'>",
    mexBoxOpen = "<div class='message-box'>",
    timeBoxOpen = "<span class='msg-time'>",
    timeBoxClose = "</span>",
    mexBoxClose = "</div>";
    mexRowClose = "</div>",


$(document).ready(function(){
   // alert("ciao");

   //Recupera il campo di input
   var $thisInput = $('#input-msg');
   var newMessage;
   var now = new Date();

   var minutes;
   if (now.getMinutes() < 10) {
      minutes = parseInt('0' + now.getMinutes());
   } else {
      minutes = now.getMinutes();
   }

   //Invio del messaggio tramite pressione del tasto Enter
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

   //Invio del messaggio tramite click dell'icona di invio
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

   //recupero l'input tramite il suo id
   var searchContacts = $('#contacts-search');

   //Ricerca filtrata contatti
   $('#contacts-search').keyup(function(e) {

      //recupero il contenuto dell'input
      var instantInput = $(this).val().toLowerCase();

      //recupero tutti gli elementi con classe 'chat-with'; essi contengono i nomi
      //dei contatti. Su ognuno di essi viene effettuato il controllo per verificare
      //se i caratteri immessi nell'input sono contenuti nel nome del contatto.
      //Ogni contatto in base al risultato del controllo verrà mostrato o nascosto
      $('.chat-with').each(function(){

         //Recupero il genitore del contatto, lo utilizzo per mostrare o noscondere il contatto
         var thisContact = $(this).parent().parent().parent();

         //Salvo in una variabile il nome del contatto corrente
         var contactName = $(this).text().toLowerCase();

         //Verifico che il contatto corrente contenga i caratteri digitati dall'utente
         var isMatched = isCharachterMatched(contactName, instantInput);

         if (!isMatched) {
            thisContact.hide();
         } else {
            thisContact.show();
         }

      });

   });

   $('.conversation-area.visible').scrollTop($('.conversation-area.visible')[0].scrollHeight);

   //Mostro la conversazione relativa al contatto cliccato
   $('.conversation-preview').click(function(){
      //recupero la conversazione attualmente mostrata; la nascondo aggiungento la classe hidden
      var conversationDisplayed = $('.conversation-area.visible');
      conversationDisplayed.removeClass('visible').addClass('hidden');
      console.log(conversationDisplayed);
      //recupero il contatto cliccato salvando in una variabile il suo id. Questo verrà utilizzato
      //per prendere la relativa conversazione e mostrarla
      var contactClicked = $(this);
      var contactId = contactClicked.attr('id');
      var currentConversation = $('.'+contactId+'.conversation-area');
      currentConversation.removeClass('hidden').addClass('visible');
      updateConversationInfo(contactClicked);
      $('.conversation-area.visible').scrollTop($('.conversation-area.visible')[0].scrollHeight);
      // currentConversation.scrollTop(currentConversation.scrollHeight);
   });



   //Metodo che permette di tenere la scrollbar fissa in basso per visualizzare sempre l'ultimo
   //messaggio inviato/ricevuto
   /* * * * * * Functions * * * * * */

   //Funzione che riceve il nome del contatto corrente (nameToSearch) e l'input immesso
   //dall'utente
   function isCharachterMatched(nameToSearch, instantInput) {
      var isCharsConteined = false;
      var noMatchCounter = 0;

      /*
         Questo controllo è indipendente dalla sequenza con la quale vengono inseriti
         i caratteri in input. Controlla che i caratteri siano contenuti nel nome senza
         tener conto dell'ordine.
         Il charAt all'interno del for permette di considerare e controllare ogni carattere
         singolarmente


      // for (var i = 0; i < instantInput.length; i++) {
      //    if ( !(nameToSearch.includes(instantInput.charAt(i))) ) {
      //       noMatchCounter++;
      //    }
      // }

      //Il contatore maggiore di 0 indica che il nome non contiene tutti i caratteri,
      //perciò la variabile verrà impostata a false, altrimenti a true
      // if (noMatchCounter > 0) {
      //    isCharsConteined = false;
      // } else {
      //    isCharsConteined = true;
      // }

      */

      //Controllo che il nome contenga i caratteri immessi dall'input. Se non li contiene
      //il contatore aumenta
      if ( !(nameToSearch.includes(instantInput)) ) {
         noMatchCounter++;
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

         $('.conversation-area.visible').append(
            mexSentRowOpen + mexBoxOpen + textMessage + timeBoxOpen + now.getHours() + " : " + minutes + timeBoxClose +  mexBoxClose + mexRowClose
         );
         $('.conversation-area.visible').scrollTop($('.conversation-area.visible')[0].scrollHeight);

      }
   }

   //Funzione che resetta il campo input dopo l'invio del messaggio
   function resetInput(inputField) {
      inputField.val('');
   }

   //Funzione che invia una risposta standard ok un secondo dopo l'invio di un messaggio
   function defaultAnswer() {
      setTimeout(function(){
         $('.conversation-area').append(
            mexReceivedRowOpen + mexBoxOpen + "ok" + timeBoxOpen + now.getHours() + " : " + minutes + timeBoxClose + mexBoxClose + mexRowClose
         );
         $('.conversation-area.visible').scrollTop($('.conversation-area.visible')[0].scrollHeight);

      },1000);
   }

   //Funzione che riceve come parametro un oggetto JQuery che rappresenta il contatto cliccato
   //Recupera la foto e il nome del contatto e aggiorna la nav bar del box conversazione
   //inserendo foto e nome del contatto cliccato
   function updateConversationInfo(contactClicked) {

      var contactPhoto = contactClicked.children('.photo-box').children('.profile-photo').attr('src');
      var contactName = contactClicked.children('.preview').children('.msg-preview').children('.chat-with').text();

      //Recuepero il box contenente foto e nome della navBar
      var conversationNav = $('.conversation-ctn').children('.section-nav').children('.contact-info');
      conversationNav.children('.profile-photo').attr('src', contactPhoto);
      conversationNav.children('.chat-with').text(contactName);
   }




});
