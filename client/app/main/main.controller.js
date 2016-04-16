'use strict';

(function() {

class MainController {
  constructor(ChaoticSystem, AESEncrypter){
    this.encrypter = AESEncrypter;
    this.system = ChaoticSystem;
    this.system.evolve();
    this.key = this.system.getKey();
    this.results = [];
  }
  evolve(){
    var value = this.encrypter.encrypt('Bonjour les amis. Comment allez vous? Moi je vais très bien! :D', this.key);
    console.log(value);
    this.system.evolve();
    this.key = this.system.getKey();
    console.log(this.encrypter.decrypt(value, this.key));
    /*var i = 1000;
    while(i--){
      this.key = this.system.getKey();
      this.$apply(()=>{for(var index in this.key){
        if(this.results[this.key[index]]){
          this.results[this.key[index]] += 1;
        }
        else{
          this.results[this.key[index]] = 1;
        }
      }
      });

    }*/
  }
/*constructor(mySocket) {
    console.log("test")
    this.socket = mySocket;
    this.value = "test";
    this.receivedMessages = [];
    this.socket.on("chat message", (msg)=>{
      console.log(msg)
      if(!msg)return;
      if(!msg.body)msg={body:msg};
      this.receivedMessages.push(msg);
    });
  }
  sendMessage(){
    this.message.avatar = "http://www.olisa.tv/wp-content/uploads/2015/01/avatarr.jpg";
    this.socket.emit("chat message", this.message);
    this.message = {};
    this.message.body = "";
  }
*/
}

angular.module('kekchoseIoApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });
})();
