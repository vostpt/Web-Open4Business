# Form select

This component is used to display an select to be used in a form.
This component will automatically update its value in form after any change.

## Inputs

| Input                 | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **formControlField**  | Form control field reference. Used so that the select can update its value in the form   |
| **id**                | Id of the select. If not provided, it is generated an UUID                               |
| **label**             | Label to be shown next to the checkbox                                                   |
| **required**          | Determines if the * symbol will appear after the label.                                  |
| **placeholder**       | Placeholder to be displayed when select is empty                                         |
| **description**       | Description to be displayed under the select                                             |
| **appendTo**          | Id of the element to be appended to                                                      |
| **groupBy**           | Key to be groupped by                                                                    |
| **items**             | Array of objects (select dataset)                                                        |
| **multiple**          | Boolean to determine if select supports multiple values or not. Default is false.        |
| **bindLabel**         | Key of the label to be bound                                                             |
| **bindValue**         | Key of the value to be bound                                                             |
| **clearable**         | Boolean that determines if the value selected can be cleared. Default is false           |
| **hideMessages**      | Determines if the messages are displayed or not. Default is false                        |


**Example:**

```
  <app-catalog-form-select formControlName="name" [formControlField]="f.name" [required]="true"
    label="{{'dictionary.name' | translate}}">
  </app-catalog-form-select>
```
