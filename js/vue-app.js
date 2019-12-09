var vue = new Vue({
  el : "#app", /*elemento que ele vai controlar */

  data : {
    error : {nome : "*", email : "*", assunto : "*", mensagem : "*"},
    contact : { nome : "", email : "", assunto : "", mensagem : ""},
    urlPost : "http://http://localhost/VUE-BLOG/app/contact.php",
    disabledButton : false,
    messageResult : ""
  },

  methods : {
    Send : function(){
      if(this.ValidateForm()){
        this.disabledButton = true;
        this.messageResult = "Enviando, por favor aguarde!";

        var form = this.formData(this.contact);
        axios.post(this.urlPost, form).then(function(response){
          console.log(response.data);
          if(response.data == "send"){
            vue.ResetForm();
            vue.ResetError();
            vue.messageResult  = "Mensagem enviada com sucesso";
            vue.disabledButton = false;
          }else{
             vue.messageResult = "Sua mensagem não pode ser enviada, por favor tente novamente.";
          }
        });
      }
    },
    formData : function(obj){
      var formData = new FormData();
      for(var key in obj){
        formData.append(key, obj[key]);
      }
      return formData;
    },
    ValidateForm : function(){
      var error = 0;
      this.ResetError();
      if(this.contact.nome.length < 4){
        this.error.nome = "Por favor, insira um nome válido (4 caracteres)";
        error++;
      }

      if(this.contact.email.indexOf("@") < 0){
        this.error.email = "E-mail inválido!";
        error++;
      }

      if(this.contact.assunto.length < 10){
        this.error.assunto = "Por favor, insira um assunto válido (10 caracteres)";
        error++;
      }

      if(this.contact.mensagem.length < 10){
        this.error.mensagem = "Por favor, insira uma mensagem válida (10 caracteres)";
        error++;
      }
      return (error === 0);
    },
    ResetForm : function(){
      this.contact.nome = "";
      this.contact.email = "";
      this.contact.assunto = "";
      this.contact.mensagem = "";
    },
    ResetError : function(){
      this.error.nome = "*";
      this.error.email = "*";
      this.error.assunto = "*";
      this.error.mensagem = "*";
    },
    OpenForm : function(show){
      if(show){
        $("#dvForm").show("slow");
        this.ResetForm();
        this.ResetError();
      }
      else{
        $("#dvForm").hide("slow");
      }
    }
  }
});
