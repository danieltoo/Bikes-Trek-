/* 
    Control Example for Bluetooth Serial PhoneGap Plugin
    https://github.com/danieltoo/Bikes-Trek-

    Copyright 2016 Daniel Torres

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
  window.onload = function() {

        visor=document.getElementById("reloj"); //localizar pantalla del reloj
        //asociar eventos a botones: al pulsar el botón se activa su función.
        document.cron.boton1.onclick = activo; 
        document.cron.boton2.onclick = pausa;
        document.cron.boton1.disabled=false;
        document.cron.boton2.disabled=true;
        //variables de inicio:
        var marcha=0; //control del temporizador
        var cro=0; //estado inicial del cronómetro.

        }

        //botón Empezar / Reiniciar
        function activo (){   
             if (document.cron.boton1.value=="Empezar") { //botón en "Empezar"
                empezar();//ir  la función empezar
            event.preventDefault();
                var text = "empezo";
                var success = function () {
                    message.value = "";
                };

                bluetoothSerial.write(text, success);
                return false;
                }
             else {  //Botón en "Reiniciar"
                reiniciar();  //ir a la función reiniciar
                event.preventDefault();
                var text = "reinicio";
                var success = function () {
                    message.value = "";
                };

                bluetoothSerial.write(text, success);
                return false;
                }
             }
        //botón pausa / continuar
        function pausa (){ 
             if (marcha==0) { //con el boton en "continuar"
                continuar(); //ir a la función continuar
            event.preventDefault();
                var text = "continuo";
                var success = function () {
                    message.value = "";
                };

                bluetoothSerial.write(text, success);
                return false;
                }
             else {  //con el botón en "parar"
                parar(); //ir a la funcion parar
                    event.preventDefault();
                var text = "paro";
                var success = function () {
                    message.value = "";
                };

                bluetoothSerial.write(text, success);
                return false;
                }
             }
        //Botón 1: Estado empezar: Poner en marcha el crono
        function empezar() {
              emp=new Date() ;//fecha inicial (en el momento de pulsar)
              elcrono=setInterval(tiempo,10); //función del temporizador.
              marcha=1; //indicamos que se ha puesto en marcha.
              document.cron.boton1.value="Reiniciar"; //Cambiar estado del botón
              document.cron.boton2.disabled=false; //activar botón de pausa
              }
        //función del temporizador          
        function tiempo() { 
             actual=new Date(); //fecha a cada instante
                //tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
             cro=actual-emp; //milisegundos transcurridos.
             cr=new Date(); //pasamos el num. de milisegundos a objeto fecha.
             cr.setTime(cro); 
                //obtener los distintos formatos de la fecha:
             cs=cr.getMilliseconds(); //milisegundos 
             cs=cs/10; //paso a centésimas de segundo.
             cs=Math.round(cs); //redondear las centésimas
             sg=cr.getSeconds(); //segundos 
             mn=cr.getMinutes(); //minutos 
             ho=0; //horas 
                //poner siempre 2 cifras en los números      
             if (cs<10) {cs="0"+cs;} 
             if (sg<10) {sg="0"+sg;} 
             if (mn<10) {mn="0"+mn;} 
             
                //llevar resultado al visor.         
            // =ho+" : "+mn+" : "+sg+" : "+cs; 
             document.getElementById("horas").value =ho;
             document.getElementById("minutos").value =mn;
             document.getElementById("segundos").value =sg;
             document.getElementById("milisegundos").value =cs;
             if(mn==59){ho++;}
             }
        //parar el cronómetro
        function parar() { 
             clearInterval(elcrono); //parar el crono
             marcha=0; //indicar que está parado.
             document.cron.boton2.value="Continuar"; //cambiar el estado del botón
             }       
        //Continuar una cuenta empezada y parada.
        function continuar() {
             emp2=new Date(); //fecha actual
             emp2=emp2.getTime(); //pasar a tiempo Unix
             emp3=emp2-cro; //restar tiempo anterior
             emp=new Date(); //nueva fecha inicial para pasar al temporizador 
             emp.setTime(emp3); //datos para nueva fecha inicial.
             elcrono=setInterval(tiempo,10); //activar temporizador
             marcha=1; //indicar que esta en marcha
             document.cron.boton2.value="parar"; //Cambiar estado del botón
             document.cron.boton1.disabled=false; //activar boton 1 si estuviera desactivado
             }
        //Volver al estado inicial
        function reiniciar() {
             if (marcha==1) {  //si el cronómetro está en marcha:
                 clearInterval(elcrono); //parar el crono
                 marcha=0;  //indicar que está parado
                 }
                     //en cualquier caso volvemos a los valores iniciales
             cro=0; //tiempo transcurrido a cero
              
             document.getElementById("horas").value ="00";
             document.getElementById("minutos").value ="00";
             document.getElementById("segundos").value ="00";
             document.getElementById("milisegundos").value ="00";
             document.cron.boton1.value="Empezar"; //estado inicial primer botón
             document.cron.boton2.value="Parar"; //estado inicial segundo botón
             document.cron.boton2.disabled=true;  //segundo botón desactivado    
             }  
