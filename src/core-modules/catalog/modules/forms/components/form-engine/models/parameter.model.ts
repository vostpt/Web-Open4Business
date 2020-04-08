export class Parameter {
  key: string;
  dataType: string;
  label: string;
  allowedExtensions?: string[]; // used in files
  fields?: Parameter[]; // used in group of fields
  hint?: string;
  isVisible?: boolean;
  placeholder?: string;
  multipleSelections?: boolean; // used in select
  rank?: number;
  validations?: {
    isRequired?: boolean,
    regexPattern?: string
  };
  values?: any; // could be integer, string, array...
  visibilityConditions?: {
    parameterKey: string,
    values: any[]
  };
}

export class ParameterModel extends Parameter {
  constructor(parameter: Parameter) {
    super();
    this.initParameter(parameter);
  }

  get() {
    return {
      key: this.key,
      dataType: this.dataType,
      label: this.label,
      allowedExtensions: this.allowedExtensions,
      fields: this.fields,
      hint: this.hint,
      isVisible: this.isVisible,
      placeholder: this.placeholder,
      rank: this.rank,
      validations: this.validations,
      values: this.values,
      visibilityConditions: this.visibilityConditions
    };
  }

  initParameter(parameter) {
    this.key = parameter.key;
    this.dataType = parameter.dataType;
    this.label = parameter.label;
    this.allowedExtensions = parameter.allowedExtensions;
    this.hint = parameter.hint;
    this.isVisible = parameter.isVisible;
    this.placeholder = parameter.placeholder;
    this.rank = parameter.rank;
    this.validations = parameter.validations;
    this.values = parameter.values;
    this.visibilityConditions = parameter.visibilityConditions;

    if (parameter.fields) {
      this.fields = (parameter.fields || []).map(f => new ParameterModel(f).get());
    }
  }
}
