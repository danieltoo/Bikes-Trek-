/*
    Control Example for Bluetooth Serial PhoneGap Plugin
    https://github.com/danieltoo/Bikes-Trek-

    Copyright 2013 Daniel Torres

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

/* jshint quotmark: false, unused: vars */
/* global cordova, bluetoothSerial, listButton, connectButton, sendButton, disconnectButton */
/* global chatform, deviceList, message, messages, statusMessage, chat, connection */
'use strict';
var ayudaactiva = false;
var fondo = "#595b5b";
var fondo2 ="#4b4d4e";
var acautoluz=true;
var app = {
    initialize: function() {
        this.bind();
        listButton.style.display = "none";
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.foo(), and not this.foo()
 
        // wire buttons to functions
        connectButton.ontouchstart = app.connect;
        listButton.ontouchstart = app.EncenderBT;
        Mot.onchange = app.autoluz;
        settings.ontouchstart= app.setting;

        //irainformacion.ontouchstart=app.Mayuda;
        
        iracontrol.ontouchstart=app.Mcontrol;
        iracronometro.ontouchstart=app.Mcronometro;
        iradirecciones.ontouchstart=app.Mdirecciones;
        iraconfig.ontouchstart=app.Mconfig;
        iramejores.ontouchstart=app.Mfavoritos;

        Badelante.ontouchstart= app.enviaadelante;
        Bizquierda.ontouchstart= app.enviaizquierda;
        Bderecha.ontouchstart= app.enviaderecha;
        Balto.ontouchstart= app.enviaalto;

        Ilum.onchange = app.Ilumina;

        sendButton.ontouchstart = app.sendData;
        chatform.onsubmit = app.sendData;
        disconnectButton.ontouchstart = app.disconnect;

        // listen for messages
        bluetoothSerial.subscribe("\n", app.onmessage, app.generateFailureFunction("Error al conectar"));

        // get a list of peers
        setTimeout(app.list, 2000);
    },
    setting: function(event) {
        bluetoothSerial.showBluetoothSettings();
    },
    EncenderBT: function(event) {
        bluetoothSerial.enable(
            function() {
                location.reload(true);
                navigator.showToast("Bluetooth Activado");
                //alert("Bluetooth Activado");
            },
            function() {
                //alert("Ocurrio un problema con bluetooth");
                navigator.showToast("Verifique su configuración");
            }
        );
    },
    Ilumina: function(event) {
        event.preventDefault();
        valorrange.innerHTML = Ilum.value+"%";
        
        var text = Ilum.value;
        var success = function () {
            message.value = "";
        };
        bluetoothSerial.write(text, success);
        return false;
        
    },
    enviaadelante: function(event) {
        event.preventDefault();
        var text = "adelante";
        var success = function () {
            Bizquierda.style.backgroundColor=fondo2;
            Bderecha.style.backgroundColor=fondo2;
            Balto.style.backgroundColor=fondo2;
            Badelante.style.backgroundColor="#848484";
        };
        bluetoothSerial.write(text, success);
        return false;
    },
    enviaizquierda: function(event) {
        event.preventDefault();
        var text = "izquierda";
        var success = function () {
            Bizquierda.style.backgroundColor="#848484";
            Bderecha.style.backgroundColor=fondo2;
            Balto.style.backgroundColor=fondo2;
            Badelante.style.backgroundColor=fondo2;
        };
        bluetoothSerial.write(text, success);
        return false;
    },
    enviaderecha: function(event) {
        event.preventDefault();
        var text = "derecha";
        var success = function () {
            Bizquierda.style.backgroundColor=fondo2;
            Bderecha.style.backgroundColor="#848484";
            Balto.style.backgroundColor=fondo2;
            Badelante.style.backgroundColor=fondo2;
        };
        bluetoothSerial.write(text, success);
        return false;
    },
    enviaalto: function(event) {
        event.preventDefault();
        var text = "alto";
        var success = function () {
            Bizquierda.style.backgroundColor=fondo2;
            Bderecha.style.backgroundColor=fondo2;
            Balto.style.backgroundColor="#848484";
            Badelante.style.backgroundColor=fondo2;
        };
        bluetoothSerial.write(text, success);
        return false;
    },
    autoluz: function(event) {
        event.preventDefault();
        var success = function () {
            var mensaje="";
        };
        var act = "";
       if (acautoluz) {
            acautoluz=false;
            act="manual";
            //alert("Cambiando a manual");
            navigator.showToast("Iluminación manual");
            manual.style.display= "block";
        }else{
            acautoluz=true;
            act="automatico";
            //alert("Cambiando a automatico");
            navigator.showToast("Iluminación automatica");
            manual.style.display="none";
        }
        bluetoothSerial.write(act, success);
        return false;
    },
    Mfavoritos: function(event) {
        connection.style.display="none";
        Config.style.display="none";
        Favoritos.style.display="block";
        Ayuda.style.display="none";
        control.style.display="none";
        iracontrol.style.backgroundColor=fondo;
        iraconfig.style.backgroundColor=fondo;
        iramejores.style.backgroundColor="#288edf";
 
    },
    Mconfig: function(event) {
        connection.style.display="none";
        Config.style.display="block";
        Favoritos.style.display="none";
        Ayuda.style.display="none";
        control.style.display="none";
        iracontrol.style.backgroundColor=fondo;
        iraconfig.style.backgroundColor="#288edf";
        iramejores.style.backgroundColor=fondo;
    },
    Mayuda: function(event) {
        if (ayudaactiva){
          irainformacion.style.backgroundColor=fondo;  
          Ayuda.style.display="none";
          connection.style.display="block";
          ayudaactiva=false;
        }else{
            connection.style.display="none";
            Ayuda.style.display="block";
            irainformacion.style.backgroundColor="#288edf";
            ayudaactiva=true;
        }
    },
    Mcontrol: function(event) {
        Config.style.display="none";
        Favoritos.style.display="none";
        Ayuda.style.display="none";
        control.style.display="block";
        iracontrol.style.backgroundColor="#288edf";
        iraconfig.style.backgroundColor=fondo;
        iramejores.style.backgroundColor=fondo;
    },
    Mdirecciones: function(event) {
        direcciones.style.display="block";
        cronometro.style.display="none";
    },
    Mcronometro: function(event) {
        direcciones.style.display="none";
        cronometro.style.display="block";
    },
    list: function(event) {
        deviceList.firstChild.innerHTML = "Buscando...";
        //app.setStatus("Buscando dispositivos...");
        navigator.showToast('Buscando dispositivos...');
        bluetoothSerial.list(app.ondevicelist, app.generateFailureFunction("List Failed"));
    },
    connect: function() {
        var device = deviceList[deviceList.selectedIndex].value;
        app.disable(connectButton);
        navigator.showToast("Conectando con " + device);
        bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
    },
    disconnect: function(event) {
        if (event) {
            event.preventDefault();
        }
        //app.setStatus("Desconectando...");
        navigator.showToast("Desconectando...");
        bluetoothSerial.disconnect(app.ondisconnect);
    },
    sendData: function(event) {
        event.preventDefault();
        var text = message.value + "\n";
        var success = function () {
            //Esto no sirve
            /*message.value = "";
            messages.value += ("Us: " + text);
            messages.scrollTop = messages.scrollHeight;*/
        };
        bluetoothSerial.write(text, success);
        return false;
    },
    ondevicelist: function(devices) {
        var option;
        deviceList.innerHTML = "";
        app.setStatus("");
        devices.forEach(function(device) {
            option = document.createElement('option');
            if (device.hasOwnProperty("uuid")) {
                option.value = device.uuid;
            } else if (device.hasOwnProperty("address")) {
                option.value = device.address;
            } else {
                option.value = "ERROR " + JSON.stringify(device);
            }
            option.innerHTML = device.name;
            deviceList.appendChild(option);
        });
        if (devices.length === 0) {
            option = document.createElement('option');
            option.innerHTML = "No hay dispositivos";
            deviceList.appendChild(option);
            if (cordova.platformId === "ios") { // BLE
                app.setStatus("No hay dispositivos vinculados.");
            } else { // Android
                //app.setStatus("Por favor vincule su dispositivo.");
                bluetoothSerial.isEnabled(
                    function() { 
                        navigator.showToast("Por favor vincule su dispositivo.");
                        vincular.style.display="block";
                    },
                    function() { 
                        navigator.showToast("Por favor encienda su Bluetooth.");
                        listButton.style.display = "";
                    }
                );
                
            }
            app.disable(connectButton);
            //listButton.style.display = "";
        } else {
            app.enable(connectButton);
            listButton.style.display = "none";
            navigator.showToast("Encontrados " + devices.length + " dispositivo" + (devices.length === 1 ? "." : "s."));
            //app.setStatus("Encontrados " + devices.length + " dispositivo" + (devices.length === 1 ? "." : "s."));
        }
    },
    onconnect: function() {
        connection.style.display = "none";
        control.style.display = "block";
        bar2.style.display="block";
        bar1.style.display="none";
        iracontrol.style.backgroundColor="#288edf";
        iraconfig.style.backgroundColor=fondo;
        iramejores.style.backgroundColor=fondo;
        //alert("Conectado");
        navigator.showToast("Conectado");
        //app.setStatus("Conectado");
    },
    ondisconnect: function(reason) {
        var details = "";
        if (reason) {
            details += ": " + JSON.stringify(reason);
        }
        connection.style.display = "block";
        app.enable(connectButton);
        bar1.style.display="block";
        bar2.style.display="none";
        control.style.display = "none";
        Config.style.display="none";
        Favoritos.style.display="none";
        //app.setStatus("Desconectado");
        navigator.showToast("Desconectado");
    },
    onmessage: function(message) {
        distancia.value= message+ " m";
        var tiempo = segundos.value +(minutos.value*60);
        var v;
        if (tiempo > 0){
            v=message/tiempo;
        }else{
            v=0;
        }
        velocidad.value=v+" m/s";
        //alert(v);
        //messages.value += "Them: " + message;
        //messages.scrollTop = messages.scrollHeight;
    },
    setStatus: function(message) { // setStatus
        console.log(message);
        window.clearTimeout(app.statusTimeout);
        statusMessage.innerHTML = message;
        statusMessage.className = 'fadein';
        // automatically clear the status with a timer
        app.statusTimeout = setTimeout(function () {
            statusMessage.className = 'fadeout';
        }, 5000);
    },
    enable: function(button) {
        button.className = button.className.replace(/\bis-disabled\b/g,'');
    },
    disable: function(button) {
        if (!button.className.match(/is-disabled/)) {
            button.className += " is-disabled";
        }
    },
    generateFailureFunction: function(message) {
        var func = function(reason) { // some failure callbacks pass a reason
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            //app.setStatus(message + details);
            navigator.showToast(message + details);
        };
        return func;
    }
};
