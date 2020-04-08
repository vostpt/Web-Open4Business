class Value {
  dataType: string;
  value: any; // needs to be a string but can receive string, objects, arrays, etc
}

export class ValueModel extends Value {
  constructor(data: Value) {
    super();
    this.value = data.value;
    switch (data.dataType) {
      case 'hexadecimal':
      case 'ip':
      case 'static-list':
        this.dataType = 'string';
        break;
      case 'file':
        this.dataType = 'object';
        break;
      case 'fields-group':
        this.dataType = 'array';
        this.value = data.value.map(v => {

          return {
            dataType: 'object',
            value: v
          };
        });
        break;
      // Commented code on purpose, needs to be evaluated if keeps commented or alive
      // case 'integer':
      //   this.dataType = 'numeric';
      //   break;
      default:
        this.dataType = data.dataType;
        break;
    }
  }
}
