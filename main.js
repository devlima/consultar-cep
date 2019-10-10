(function(){
    'use strict';

    var DOM = function DOM(elements){
      this.element = document.querySelectorAll(elements);
    }
  
    DOM.prototype.on = function on(eventType, callback) {
      Array.prototype.forEach.call(this.element, function(element){
        element.addEventListener(eventType, callback, false);
      })
    }
  
    DOM.prototype.get = function get(){
      return this.element;
    }
   
    var $formCep = new DOM('[id="form-cep"]');
    var $inputCEP = new DOM('[id="cep-submit"]');
    var $infoCEP = new DOM('[id="cep-info"]');
    var ajax = new XMLHttpRequest();
        $formCep.on('submit', handleSubmitFormCEP);
   
    function handleSubmitFormCEP(event){
      event.preventDefault();
      
      var url = getURL();
  
      ajax.open('GET', url);
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange);
  
    }
  
    function getURL(){
      return 'http://apps.widenet.com.br/busca-cep/api/cep/[CEP].json'.replace('[CEP]',
       $inputCEP.get()[0].value.replace(/\D/g, ''))
    }
  
    function handleReadyStateChange(){
      if(isRequestOk()){
          var data = JSON.parse(ajax.responseText);
  
          if(data.status === 0){
            return $infoCEP.get()[0].textContent = data.message;
          }
  
          $infoCEP.get()[0].textContent = data.address + ', ' + data.district + ', '+ data.city + ' - ' 
                                        + data.state + ' - ' + data.code;
      }
    }
    
    function isRequestOk(){
        return ajax.readyState === 4 && ajax.status === 200;
    }
  })()