# Form textarea

This component is used to display an textarea to be used in a form.
This component will automatically update its value in form after any change.

## Inputs

| Input                 | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **formControlField**  | Form control field reference. Used so that the textarea can update its value in the form |
| **id**                | Id of the textarea. If not provided, it is generated an UUID                             |
| **label**             | Label to be shown next to the checkbox                                                   |
| **required**          | Determines if the * symbol will appear after the label.                                  |
| **placeholder**       | Placeholder to be displayed when textarea is empty                                       |
| **description**       | Description to be displayed under the textarea                                           |
| **autofocus**         | Determines if the textarea will be the field automatically focused                       |
| **readonly**          | Determines if the textarea can be edited. Default is false                               |
| **resizable**         | Determines if the textarea has ajustable height. Default is true                         |
| **rows**              | Sets the max rows to be displayed. The default is 5                                      |
| **tooltip**           | Tooltip to be displayed on hover                                                         |
| **icon**              | Label icon                                                                               |
| **hideMessages**      | Determines if the messages are displayed or not. Default is false                        |
| **copyToClipboard**   | Determines if copy to clipboard button is displayed. Default is false                    |

## Outputs

| textarea                 | Description                 |
| -------------------   | --------------------------- |
| fieldIconClickedEvent | Fired on fieldIcon clicked. |

**Example:**

```
  <app-catalog-form-textarea formControlName="name" [formControlField]="f.name" [required]="true"
    label="{{'dictionary.name' | translate}}">
  </app-catalog-form-textarea>
```
