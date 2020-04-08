# Form input

This component is used to display an input to be used in a form.
This component will automatically update its value in form after any change.

## Inputs

| Input                 | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **formControlField**  | Form control field reference. Used so that the input can update its value in the form    |
| **id**                | Id of the input. If not provided, it is generated an UUID                                |
| **type**              | Type of the input, number, password... If not provided, assumes the value 'text'.        |
| **label**             | Label to be shown next to the checkbox                                                   |
| **required**          | Determines if the * symbol will appear after the label.                                  |
| **placeholder**       | Placeholder to be displayed when input is empty                                          |
| **description**       | Description to be displayed under the input                                              |
| **autofocus**         | Determines if the input will be the field automatically focused                          |
| **readonly**          | Determines if the input can be edited. Default is false                                  |
| **minLength**         | Minimum length of the input value                                                        |
| **maxLength**         | Maximum length of the input value                                                        |
| **min**               | Minimum value of the input                                                               |
| **max**               | Maximum value of the input                                                               |
| **tooltip**           | Tooltip to be displayed on hover                                                         |
| **icon**              | Label icon                                                                               |
| **hideMessages**      | Determines if the messages are displayed or not. Default is false                        |
| **fieldIcon**         | Optional icon to be displayed on the right of the input box                              |
| **copyToClipboard**   | Determines if copy to clipboard button is displayed. Default is false                    |
| **actions**           | Actions to be displayed in the left area of the input.                                   |

## Outputs

| Input                 | Description                 |
| -------------------   | --------------------------- |
| fieldIconClickedEvent | Fired on fieldIcon clicked. |

**Example:**

```
  <app-catalog-form-input formControlName="name" [formControlField]="f.name" [required]="true"
    label="{{'dictionary.name' | translate}}">
  </app-catalog-form-input>
```
