import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// IMPORTAMOS TODAS LAS CLASES DE GOOGLE MAPS
// QUE VAMOS A USAR
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

// PARA HACERLO UN POCO MAS INTERESANTE HEMOS ANADIDO EL COMPONENTE DE IONIC NATIVE
// GEOLACATION PARA OBTENER NUESTRA UBICACION ACTUAL
// INSTALALO Y NO OLVIDES DECLARARLO EN LA SECCION DE PROVIDERS EN NUESTRO MODULO PRINCIPAL
// ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
// npm install --save @ionic-native/geolocation
// MAS INFO https://ionicframework.com/docs/native/geolocation/

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {

  // COMENZAMOS DECLARANDO UN DATO MIEMBRO DE TIPO
  // GoogleMap
  map: GoogleMap;

  // NO OLVIDEMOS INYECTAR LA DEPENDENCIA Platform
  // CON LA CUAL VAMOS A VERIFICAR EL MOMENTO JUSTO PARA PROCEDER
  // A CARGAR NUESTRO MAPA DE GOOGLE
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    // EN ESTE CICLO DE VIDA CONFIGURAMOS EL EVENTO
    // PARA VERIFICAR QUE NUESTRO DISPOSITIVO SE ENCUENTRE LISTO
    // Y PROCEDER A CARGAR NUESTRO MAPA
    this.platform.ready().then(() => {
      // HACEMOS USO DE GEOLOCALIZACION PARA OBTENER LA LATITUD Y LONGITUD
      this.geolocation.getCurrentPosition().then((resp) => {
        // EN CASO DE QUE SE OBTUVO LA LATITUD Y LONGITUD CORRECTAMENTE
        // ENVIAMOS NUESTRAS COORDENADAS
        this.loadMap(resp.coords.latitude, resp.coords.longitude);
      }).catch((error) => {
        // EN EL CASO ALGUN PROBLEMA EN OBTENER LAS COORDENADAS
        // LE MANDAMOS LAS COORDENADAS DE ECUADOR
        this.loadMap(-0.180653, -78.467834);
      });      
    });    
  }

  loadMap(lat, lng) {
    // CONFIGURAMOS LAS OPCIONES DEL MAPA
    let mapOptions: GoogleMapOptions = {
      // VAMOS A CENTRAR NUESTRO FOCO EN NUESTRA POSICION ACTUAL
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    // 'map_canvas' HACE REFERENCIA AL ELEMENTO EN NUESTRA VISTA
    // DONDE SE VA A CARGAR EL MAPA
    // EL MAPA DEBE TENER UN TAMANO DEFINIDO
    // REVISA LOS ESTILOS DEL COMPONENTE PARA QUE VEAS COMO SE HACE
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // CONFIGURAMOS UN MARCADOR Y LO AGREGAMOS AL MAPA
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lng
      }
    });

    // CONFIGURAMOS UN EVENTO CLICK PARA NUESTRO MARCADOR
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  // REVISA LA DOCUMENTACION PARA SABER MAS
  // https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md
}
