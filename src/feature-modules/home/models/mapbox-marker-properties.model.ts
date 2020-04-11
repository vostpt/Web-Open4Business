export class MapboxMarkerProperties {
  id: string;
  locationId: string;
  company: string;
  store: string;
  address: string;
  district: string;
  county: string;
  parish: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  phone: string;
  sector: string;
  schedule1: string;
  schedule1Dow: string;
  schedule1Type: string;
  schedule2: string;
  schedule2Dow: string;
  schedule2Type: string;
  schedule3: string;
  schedule3Dow: string;
  schedule3Type: string;

  constructor(data: object) {

    this.id  = data['_id'];
    this.locationId = data['locationId'];
    this.company  = data['company'];
    this.store  = data['store'];
    this.address  = data['address'];
    this.district = data['district'];
    this.county = data['concelho'];
    this.parish = data['fregesia'];
    this.zipCode  = data['zipCode'];
    this.latitude = data['latitude'];
    this.longitude  = data['longitude'];
    this.phone  = data['phone'];
    this.sector = data['sector'];
    this.schedule1  = data['schedule1'];
    this.schedule1Dow = data['schedule1Dow'];
    this.schedule1Type  = data['schedule1Type'];
    this.schedule2  = data['schedule2'];
    this.schedule2Dow = data['schedule2Dow'];
    this.schedule2Type  = data['schedule2Type'];
    this.schedule3  = data['schedule3'];
    this.schedule3Dow = data['schedule3Dow'];
    this.schedule3Type  = data['schedule3Type'];

  }
}
