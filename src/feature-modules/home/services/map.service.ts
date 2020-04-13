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
    const url = new UrlModel(this.apiUrl).setPath('insights/v1/locations').buildUrl();
    return this.http.get(url);
  }

  getMarkersMockup() {
    return this.parseResponsoToGeoJSON(this.getData());

  }

  parseResponsoToGeoJSON(items) {

    const geoJSON: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };

    items.forEach(element => {

      // item.icon = {
      //   iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
      //   iconSize: [50, 50], // size of the icon
      //   iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
      //   popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
      //   className: 'dot'
      // };


      const item: GeoJSON.Feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [element.longitude, element.latitude]
        },
        properties: element
      };


      geoJSON.features.push(item);
    });

    return geoJSON;

  }


  getData() {
    return [
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Flores',
        address: 'B. Nossa Sra. Fátima - Edif. PT ',
        parish: '',
        county: 'Sta. Cruz das Flores',
        district: 'Açores',
        zipCode: '9970-304',
        latitude: 39.4591,
        longitude: -31.12788,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '1.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '12:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Horta - Lg. Duque Avila',
        address: 'Lg. Duque Avila e Bolama',
        parish: '',
        county: 'Horta',
        district: 'Açores',
        zipCode: '9900-141',
        latitude: 38.53688,
        longitude: -28.62661,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '2.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '13:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Angra do Heroísmo - R. Henrique Brás',
        address: 'Rua Dr. Henrique Brás 2',
        parish: '',
        county: 'Angra do Heroísmo',
        district: 'Açores',
        zipCode: '9700-097 ',
        latitude: 38.65699,
        longitude: -27.21278,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '3.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '12:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Ponta Delgada - R. Dr. Luis Bettencourt Medeiros',
        address: 'Rua Conselheiro Dr. Luís Bettencourt Medeiros 3',
        parish: '',
        county: 'Ponta Delgada',
        district: 'Açores',
        zipCode: '9500-058 ',
        latitude: 37.73898,
        longitude: -25.67047,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '4.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '12:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Espinho',
        address: 'Rua 18 643',
        parish: '',
        county: 'Espinho',
        district: 'Aveiro',
        zipCode: '4500-246 ',
        latitude: 41.00773,
        longitude: -8.64066,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '5.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO S. João da Madeira - R. Padre Oliveira',
        address: 'Rua Padre Oliveira 33',
        parish: '',
        county: 'São João da Madeira',
        district: 'Aveiro',
        zipCode: '3700-200 ',
        latitude: 40.89943,
        longitude: -8.49168,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '6.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Beja - R. Luis de Camões',
        address: 'Rua Luis Camões Edif. PT',
        parish: '',
        county: 'Beja',
        district: 'Beja',
        zipCode: '7800-508',
        latitude: 38.01196,
        longitude: -7.86073,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '7.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Barcelos - R. Irmã S. Romão',
        address: 'Rua Irma S. Romão',
        parish: '',
        county: 'Barcelos',
        district: 'Braga',
        zipCode: '4750-300 ',
        latitude: 41.53499,
        longitude: -8.6179,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '8.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Braga - Lg. João Penha',
        address: 'Largo João Penha 334',
        parish: '',
        county: 'Braga',
        district: 'Braga',
        zipCode: '4710-245 ',
        latitude: 41.54936,
        longitude: -8.42165,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '9.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Guimarães - R. Dr. José Sampaio',
        address: 'Rua Dr. José Sampaio',
        parish: '',
        county: 'Guimarães',
        district: 'Braga',
        zipCode: '4810-275 ',
        latitude: 41.44323,
        longitude: -8.28611,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '10.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Mirandela',
        address: 'R. Républica 20',
        parish: '',
        county: 'Mirandela',
        district: 'Bragança',
        zipCode: '5370-347',
        latitude: 41.48427,
        longitude: -7.18293,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '11.png',
        schedules: [
          {
            start_hour: '09:30:00',
            end_hour: '12:30:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Fundão',
        address: 'Av. Liberdade 20',
        parish: '',
        county: 'Fundão',
        district: 'Castelo Branco',
        zipCode: '6230-398',
        latitude: 40.14153,
        longitude: -7.50004,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '12.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Castelo Branco - Av. Nuno Álvares',
        address: 'Av. Nuno Álvares 29 - Loja 4',
        parish: '',
        county: 'Castelo Branco',
        district: 'Castelo Branco',
        zipCode: '6000-083 ',
        latitude: 39.82219,
        longitude: -7.49243,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '13.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Figueira da Foz - Passeio Infante D. Henrique',
        address: 'Passeio Infante D. Henrique 40 ',
        parish: '',
        county: 'Figueira da Foz',
        district: 'Coimbra',
        zipCode: '3080-154',
        latitude: 40.14919,
        longitude: -8.86043,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '14.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Oliveira do Hospital',
        address: 'R. Prof. António Garcia Ribeiro de Vasconcelos 12 B',
        parish: '',
        county: 'Oliveira do Hospital',
        district: 'Coimbra',
        zipCode: '3400-132',
        latitude: 40.35893,
        longitude: -7.8597,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '15.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '13:00:00',
            sunday: 0,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 0,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      },
      {
        company: 'ALTICE PORTUGAL',
        store: 'Loja MEO Évora - R. Menino Jesus',
        address: 'Rua Menino Jesus Edif. PT',
        parish: '',
        county: 'Évora',
        district: 'Évora',
        zipCode: '7004-503',
        latitude: 38.57306,
        longitude: -7.90976,
        phone: '',
        sector: '0',
        sector_string: 'Minimercados, supermercados, hipermercados',
        image: '16.png',
        schedules: [
          {
            start_hour: '09:00:00',
            end_hour: '18:00:00',
            sunday: 1,
            monday: 1,
            tuesday: 1,
            wednesday: 1,
            thrusday: 1,
            friday: 1,
            saturday: 1,
            type: 2,
            type_string: 'Público Geral'
          }
        ]
      }
    ];
  }

}
