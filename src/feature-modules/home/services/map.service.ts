import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class MapService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getMarkers() {
    // const url = new UrlModel(this.apiUrl).setPath('markers');
    // if (queryParams) {
    //   url.setQueryParams(queryParams);
    // }

    //return this.http.get(url.buildUrl());


    const geoJSON: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };

    this.getData().forEach(element => {
      const item = this.itemToGeoJSONPoint(element);
      geoJSON.features.push(item);
    });


    return geoJSON;

  
  }


  itemToGeoJSONPoint(item) {
    // item.icon = {
    //   iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
    //   iconSize: [50, 50], // size of the icon
    //   iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
    //   popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
    //   className: 'dot'
    // };

    const toReturn: GeoJSON.Feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.long, item.lat]
      },
      properties: item
    };

    return toReturn;
  }



  getData() {
    return [
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Flores",
        "address": "B. Nossa Sra. Fátima - Edif. PT ",
        "parish": "",
        "county": "Sta. Cruz das Flores",
        "district": "Açores",
        "postal_code": "9970-304",
        "lat": 39.4591,
        "long": -31.12788,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "1.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "12:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Horta - Lg. Duque Avila",
        "address": "Lg. Duque Avila e Bolama",
        "parish": "",
        "county": "Horta",
        "district": "Açores",
        "postal_code": "9900-141",
        "lat": 38.53688,
        "long": -28.62661,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "2.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "13:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Angra do Heroísmo - R. Henrique Brás",
        "address": "Rua Dr. Henrique Brás 2",
        "parish": "",
        "county": "Angra do Heroísmo",
        "district": "Açores",
        "postal_code": "9700-097 ",
        "lat": 38.65699,
        "long": -27.21278,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "3.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "12:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Ponta Delgada - R. Dr. Luis Bettencourt Medeiros",
        "address": "Rua Conselheiro Dr. Luís Bettencourt Medeiros 3",
        "parish": "",
        "county": "Ponta Delgada",
        "district": "Açores",
        "postal_code": "9500-058 ",
        "lat": 37.73898,
        "long": -25.67047,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "4.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "12:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Espinho",
        "address": "Rua 18 643",
        "parish": "",
        "county": "Espinho",
        "district": "Aveiro",
        "postal_code": "4500-246 ",
        "lat": 41.00773,
        "long": -8.64066,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "5.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO S. João da Madeira - R. Padre Oliveira",
        "address": "Rua Padre Oliveira 33",
        "parish": "",
        "county": "São João da Madeira",
        "district": "Aveiro",
        "postal_code": "3700-200 ",
        "lat": 40.89943,
        "long": -8.49168,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "6.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Beja - R. Luis de Camões",
        "address": "Rua Luis Camões Edif. PT",
        "parish": "",
        "county": "Beja",
        "district": "Beja",
        "postal_code": "7800-508",
        "lat": 38.01196,
        "long": -7.86073,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "7.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Barcelos - R. Irmã S. Romão",
        "address": "Rua Irma S. Romão",
        "parish": "",
        "county": "Barcelos",
        "district": "Braga",
        "postal_code": "4750-300 ",
        "lat": 41.53499,
        "long": -8.6179,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "8.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Braga - Lg. João Penha",
        "address": "Largo João Penha 334",
        "parish": "",
        "county": "Braga",
        "district": "Braga",
        "postal_code": "4710-245 ",
        "lat": 41.54936,
        "long": -8.42165,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "9.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Guimarães - R. Dr. José Sampaio",
        "address": "Rua Dr. José Sampaio",
        "parish": "",
        "county": "Guimarães",
        "district": "Braga",
        "postal_code": "4810-275 ",
        "lat": 41.44323,
        "long": -8.28611,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "10.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Mirandela",
        "address": "R. Républica 20",
        "parish": "",
        "county": "Mirandela",
        "district": "Bragança",
        "postal_code": "5370-347",
        "lat": 41.48427,
        "long": -7.18293,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "11.png",
        "schedules": [
          {
            "start_hour": "09:30:00",
            "end_hour": "12:30:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Fundão",
        "address": "Av. Liberdade 20",
        "parish": "",
        "county": "Fundão",
        "district": "Castelo Branco",
        "postal_code": "6230-398",
        "lat": 40.14153,
        "long": -7.50004,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "12.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Castelo Branco - Av. Nuno Álvares",
        "address": "Av. Nuno Álvares 29 - Loja 4",
        "parish": "",
        "county": "Castelo Branco",
        "district": "Castelo Branco",
        "postal_code": "6000-083 ",
        "lat": 39.82219,
        "long": -7.49243,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "13.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Figueira da Foz - Passeio Infante D. Henrique",
        "address": "Passeio Infante D. Henrique 40 ",
        "parish": "",
        "county": "Figueira da Foz",
        "district": "Coimbra",
        "postal_code": "3080-154",
        "lat": 40.14919,
        "long": -8.86043,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "14.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Oliveira do Hospital",
        "address": "R. Prof. António Garcia Ribeiro de Vasconcelos 12 B",
        "parish": "",
        "county": "Oliveira do Hospital",
        "district": "Coimbra",
        "postal_code": "3400-132",
        "lat": 40.35893,
        "long": -7.8597,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "15.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "13:00:00",
            "sunday": 0,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 0,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      },
      {
        "company": "ALTICE PORTUGAL",
        "store_name": "Loja MEO Évora - R. Menino Jesus",
        "address": "Rua Menino Jesus Edif. PT",
        "parish": "",
        "county": "Évora",
        "district": "Évora",
        "postal_code": "7004-503",
        "lat": 38.57306,
        "long": -7.90976,
        "phone_number": "",
        "sector": "0",
        "sector_string": "Minimercados, supermercados, hipermercados",
        "image": "16.png",
        "schedules": [
          {
            "start_hour": "09:00:00",
            "end_hour": "18:00:00",
            "sunday": 1,
            "monday": 1,
            "tuesday": 1,
            "wednesday": 1,
            "thrusday": 1,
            "friday": 1,
            "saturday": 1,
            "type": 2,
            "type_string": "Público Geral"
          }
        ]
      }
    ];
  }

}
