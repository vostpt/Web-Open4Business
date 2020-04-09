import { Injectable } from '@angular/core';

import { environment } from '../models/environment.model';

@Injectable()
export class EnvironmentService {

  public variables = environment;

  constructor() { }

}
