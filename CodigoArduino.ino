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
#include <LiquidCrystal.h>
#define frente 3
#define derecha 10
#define izquierda 9
String accion;
LiquidCrystal lcd( 4, 2, 5, 6, 7, 8);
boolean automatico= true;
boolean cronometro=false;
boolean Efrente=false;
boolean Ederecha =false;
boolean Eizquierda = false;
boolean alto=false;
int segundos ;
int minutos;
int distancia=0;
int seguidor = 1;
int fotoresistor = 0;
int luz;
void (*myReset) (void) = 0x0;
String tiempo;
//-------------------------------------Inicializacion

void setup(){
  Serial.begin(9600);
  lcd.begin(16,2);
  analogWrite(11,700);
  lcd.print("Conectado");
  lcd.setCursor(0,1);
  lcd.print("**Bikes Trek**") ;
}

//--------------------------------------------Setup
void loop(){

  while (Serial.available()) {    
     delay(5);
     char c = Serial.read(); 
     accion += c;                
  }
//---------------------------------------Lectura puerto serial

  if (accion.length()>0){
    char a=accion[0];
    
    if(a>='0' && a<='9'){
      if (!automatico){
          luz= map(accion.toInt() ,'0','9',0,255);
      }
//------------------------------------------Numeros en el rango          
    }else{
      if (accion=="automatico"){
            automatico=true;
            lcd.setCursor(0,1);
            lcd.clear();
            lcd.print("Luz Autimatica");
            
            
            
            delay(1000);
      }else if(accion=="manual"){
            automatico=false;
            lcd.setCursor(0,1);
            lcd.clear();
            lcd.print("Luz Manual");
            delay(1000);
// ---------------------------------------------Automatico a Manual
      }else if (accion == "empezo" || accion == "continuo"){
            cronometro = true;
            lcd.setCursor(0,1);
            lcd.clear();
            
        }else if (accion == "reinicio"){ 
            Serial.println(0); 
            distancia=0;
            cronometro=false;
            tiempo="";  
            lcd.clear();
            lcd.print("**Reinicio**");  

       }else if (accion == "paro"){
            cronometro=false; 
            Serial.println(distancia);
            lcd.clear();
            lcd.print("T= "+tiempo);
            lcd.setCursor(0,1);
            lcd.print("D= "+String(distancia));
//-----------------------------------------Cronometro            
       }else if (accion=="izquierda"){
            Eizquierda=true;
            Efrente=false;
            Ederecha=false;
            alto=false;
            lcd.clear();
            lcd.print("Izquierda");
            delay(1000);    
        }else if (accion=="adelante"){
            Eizquierda=false;
            Efrente=true;
            Ederecha=false;
            alto=false;
            lcd.clear();
            lcd.print("Adelante");
            delay(1000);
        }
        else if (accion=="derecha"){
            Eizquierda=false;
            Efrente=false;
            Ederecha=true;
            alto=false;
            lcd.clear();
            lcd.print("Derecha");
            delay(1000);    
        }
        else if (accion=="alto"){
           Eizquierda=false;
            Efrente=false;
            Ederecha=false;
            alto=true;
            lcd.clear();
            lcd.print("Alto");
            delay(1000);
        }
// --------------------------------------Direccionales
       else if (accion=="desconectado"){
            lcd.setCursor(0,1);
            lcd.clear();
            lcd.print("Desconectado :(");
            delay(2000);
            myReset();
        }
    }
//---------------------------------------------Desconetar
  }else if (cronometro){
    int seguir;
    Serial.println(distancia);
    lcd.setCursor(0,1);
    lcd.print("Tiempo:");
    seguir = analogRead(seguidor);
    if (seguir <= 500){
      distancia++;
      lcd.setCursor(8, 1);    
      String s = reloj() ;
      lcd.print(s) ;
      delay(350);
    }
  } 
//..........................................Encender Lunes
  if (automatico){   
    luz = analogRead(fotoresistor);
    if (!alto){
      if (Efrente){
        analogWrite(frente,luz);
      }else{
        analogWrite(frente,0);
      }
      if (Ederecha){
        analogWrite(derecha,luz);
      }else{
        analogWrite(derecha,0);
      }
      if (Eizquierda){
        analogWrite(izquierda,luz);
      }else{
        analogWrite(izquierda,0);
      }
    }else{
       analogWrite(izquierda,luz);
       analogWrite(derecha,luz);
       analogWrite(frente,luz);
       delay(500);
       analogWrite(izquierda,0);
       analogWrite(derecha,0);
       analogWrite(frente,0);
       delay(500);
    }
  }else{
     if (!alto){
      if (Efrente){
        analogWrite(frente,luz);
      }else{
        analogWrite(frente,0);
      }
      if (Ederecha){
        analogWrite(derecha,luz);
      }else{
        analogWrite(derecha,0);
      }
      if (Eizquierda){
        analogWrite(izquierda,luz);
      }else{
        analogWrite(izquierda,0);
      }
    }else{
       analogWrite(izquierda,luz);
       analogWrite(derecha,luz);
       analogWrite(frente,luz);
       delay(1000);
       analogWrite(izquierda,0);
       analogWrite(derecha,0);
       analogWrite(frente,0);
       delay(1000); 
    } 
  }
//---------------------------------------Encender Luces
  accion="";
}

String reloj() {
       int n = millis() / 1000 ;       // Lo pasamos a segundos
       segundos = n % 60  ;
       minutos =  n / 60  ;
       String S = "00:"+String(minutos) + ":" + String(segundos);
       tiempo ="00:"+String(minutos) + ":" + String(segundos);
       return (S);
   }
//  -------------------------Creacion de la cadena Reloj
