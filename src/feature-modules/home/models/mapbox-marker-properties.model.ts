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
  schedule1Period: string;
  schedule2: string;
  schedule2Dow: string;
  schedule2Type: string;
  schedule2Period: string;
  schedule3: string;
  schedule3Dow: string;
  schedule3Type: string;
  schedule3Period: string;
  typeOfService: string;
  byAppointment: string;
  contactForSchedule: string;
  obs: string;

  constructor(data: object) {
    this.id = this.tryGetValue(data, '_id');
    this.locationId = this.tryGetValue(data, 'locationId');
    this.company = this.tryGetValue(data, 'company');
    this.store = this.tryGetValue(data, 'store');
    this.address = this.tryGetValue(data, 'address');
    this.district = this.tryGetValue(data, 'district');
    this.county = this.tryGetValue(data, 'county') || this.tryGetValue(data, 'council');
    this.parish = this.tryGetValue(data, 'parish');
    this.zipCode = this.tryGetValue(data, 'zipCode');
    this.latitude = this.tryGetValue(data, 'latitude');
    this.longitude = this.tryGetValue(data, 'longitude');
    this.phone = this.tryGetValue(data, 'phone');
    this.sector = this.tryGetValue(data, 'sector');
    this.schedule1 = this.tryGetValue(data, 'schedule1');
    this.schedule1Dow = this.tryGetValue(data, 'schedule1Dow');
    this.schedule1Type = this.tryGetValue(data, 'schedule1Type');
    this.schedule1Period = this.tryGetValue(data, 'schedule1Period');
    this.schedule2 = this.tryGetValue(data, 'schedule2');
    this.schedule2Dow = this.tryGetValue(data, 'schedule2Dow');
    this.schedule2Type = this.tryGetValue(data, 'schedule2Type');
    this.schedule2Period = this.tryGetValue(data, 'schedule2Period');
    this.schedule3 = this.tryGetValue(data, 'schedule3');
    this.schedule3Dow = this.tryGetValue(data, 'schedule3Dow');
    this.schedule3Type = this.tryGetValue(data, 'schedule3Type');
    this.schedule3Period = this.tryGetValue(data, 'schedule3Period');
    this.typeOfService = this.tryGetValue(data, 'typeOfService');
    this.byAppointment = this.tryGetValue(data, 'byAppointment');
    this.contactForSchedule = this.tryGetValue(data, 'contactForSchedule');
    this.obs = this.tryGetValue(data, 'obs');
  }

  private tryGetValue(data: object, key: string): string {
    return !data[key] || data[key] === 'undefined' || data[key] === 'null' ?
        '' :
        data[key];
  }
}
