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


var db = openDatabase('BDBikes', '1.0', 'MBase de datos de Bike\'s  Trek', 100 * 1024);
 var tama=0;          

db.transaction(function(tx) {
    tx.executeSql('create table if not exists Mejores(id, name, time, dis, vel)');
    //tx.executeSql('insert into Mejores(id, name, time, dis, vel, date) values (1, "Avenida Principal", "0:0:0:20","30m","30m20s","1-may-2016")');
    tx.executeSql("SELECT COUNT(*) as dato FROM Mejores",[],function (tx,rs) {
        var cont = document.getElementById("cont");
        var datos = "Registros : ";
        for (var i = 0; i < rs.rows.length; i++) {
            var p = rs.rows.item(i);
            datos += p.dato;
            tama++;
        } 
        if (tama>0) {
           cont.innerHTML = datos; 
       }else{
        cont.innerHTML = "Sin Registros";

       }
                           
    }, errorCB1);

    tx.executeSql('select * from Mejores',[], function(tx, rs) {
        var salida =  document.getElementById("salida");
        var tabla = "<table style='text-align: left;' border='2px'>";
        tabla += "<tr>";
         tabla += "<th>&#9733;</th>";
         tabla += "<th>Titulo</th>";
         tabla += "<th>Tiempo</th>";
         tabla += "<th>Distancia</th>";
         tabla += "<th>Vel Aprox.</th>";
         tabla += "</tr>";
                            
        for (var i = 0; i < rs.rows.length  && i < 10 ; i++) {
            tabla+="<tr>";
            var p = rs.rows.item(i);
            tabla +="<td><a href='#'>"+p.id +"</a></td>";
            tabla +="<td>"+ p.name+"</td>";
            tabla +="<td>"+ p.time+"</td>";
            tabla +="<td>"+ p.dis+"</td>";
            tabla +="<td>"+ p.vel+"</td>";
           
            tabla+="</tr>";
        }
        tabla+= "</table> ";
        salida.innerHTML =tabla;
    }, errorCB1);
}, errorCB, successCB);
function errorCB() {
    var salida =  document.getElementById("statusBD");
    //salida.innerHTML ="Error al Abrir la Base de Datos";
    navigator.showToast("Error al Abrir la Base de Datos")
}
function errorCB1() {
     var salida =  document.getElementById("statusBD");
        //salida.innerHTML ="Error al Cargar Mejores";
        navigator.showToast("Error al Cargar Mejores");
}
function successCB() {
    var salida =  document.getElementById("statusBD");
    //salida.innerHTML ="Mejores cargados correctamente";
    navigator.showToast("Mejores cargados correctamente")
}
function successCB1() {
    //("Datos Guardados");
    var salida =  document.getElementById("statusBD");
    //salida.innerHTML ="Datos cargados Correctamente";
    navigator.showToast("Datos guardados correctamente");
}
function muestrarango(){
    var valor = document.getElementById("valorrange");
    var rango = document.getElementById("ran");
    valor.innerHTML = rango.value +"%"; 
}
function insertar(){
    var mascota = prompt("Ingrese un titulo", "");
    //Detectamos si el usuario ingreso un valor
    var title;
    if (mascota != null){
        title = mascota;
        navigator.showToast("Guardando " + mascota);
        //alert("Titulo " + mascota);
    }
    //Detectamos si el usuario NO ingreso un valor
    else {
        title="sin title"
        navigator.showToast("No hay titulo");
        //alert("No hay titulo");
    }
    
db.transaction(function(tx) {
    var horas = document.getElementById("horas").value;
    var minutos = document.getElementById("minutos").value;
    var segundos = document.getElementById("segundos").value;
    var mili = document.getElementById("milisegundos").value;

    var distancia = document.getElementById("distancia").value;
    var velocidad = document.getElementById("velocidad").value;
    var id = tama+1;
    tama ++;
    var time = horas +":"+minutos+":"+segundos+":"+mili;
    var sentencia = "insert into Mejores (id , name,  time ,dis, vel) values ("+id+",'"+title+"','"+time+"','"+distancia+"','"+velocidad+"')";
    //alert(sentencia);
    tx.executeSql(sentencia);
    tx.executeSql('select * from Mejores',[], function(tx, rs) {
        var salida =  document.getElementById("salida");
        var tabla = "<table style='text-align: left;' border='2px'>";
        tabla += "<tr>";
         tabla += "<th>&#9733;</th>";
         tabla += "<th>Titulo</th>";
         tabla += "<th>Tiempo</th>";
         tabla += "<th>Distancia</th>";
         tabla += "<th>Vel Aprox.</th>";
         tabla += "</tr>";
                            
        for (var i = 0; i < rs.rows.length  && i < 10 ; i++) {
            tabla+="<tr>";
            var p = rs.rows.item(i);
            tabla +="<td><a href='#'>"+p.id +"</a></td>";
            tabla +="<td>"+ p.name+"</td>";
            tabla +="<td>"+ p.time+"</td>";
            tabla +="<td>"+ p.dis+"</td>";
            tabla +="<td>"+ p.vel+"</td>";
           
            tabla+="</tr>";
        }
        tabla+= "</table> ";
        salida.innerHTML =tabla;
    }, errorCB1);
    

    
}, errorinsert,successCB1);
}
function errorinsert() {
    //alert("Error al insertar");
    navigator.showToast("Error al insertar");
}
