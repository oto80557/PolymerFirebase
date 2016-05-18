(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  app.firebaseURL = 'https://polymerandfirebase.firebaseio.com/';
  app.firebaseProvider = 'anonymous';

  app.items = [];

  app.updateItems = function(snapshot) {
    this.items = [];
    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.uid = childSnapshot.key();
      this.push('items', item);
    }.bind(this));
  };

  app.addItem = function(event) {
      event.preventDefault(); // Don't send the form!
      this.ref.push({
      done: false,
      text: app.newItemValue,
      textEsp: app.newItemValueEsp
    });
    app.newItemValue = '';
    app.newItemValueEsp = '';
  };

  app.toggleItem = function(event) {
    this.ref.child(event.model.item.uid).update({done: event.model.item.done});
  };

  app.deleteItem = function(event) {
    this.ref.child(event.model.item.uid).remove();
  };
  
  app.modItem = function(event){
    if(event.model.item.uid === true){
      this.ref.child(event.model.item.uid).update({text: app.newItemValue});
    }
    alert("Hello! I am an alert box!!");
  };
  
  app.onFirebaseError = function(e) {
    this.$.errorToast.text = e.detail.message;
    this.$.errorToast.show();
  };
  app.onFirebaseLogin = function(e) {
    this.ref = new Firebase(this.firebaseURL + '/user/' + e.detail.user.uid);
    this.ref.on('value', function(snapshot) {
      app.updateItems(snapshot);
    });
  };

})(document);