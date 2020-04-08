# Form checkbox

This component is used to display a checkbox to be used in a form.
This component will automatically update its value in form when pressed.

## Inputs

| Input                 | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **formControlField**  | Form control field reference. Used so that the checkbox can update its value in the form |
| **label**             | Label to be shown next to the checkbox                                                   |

**Example:**

```
  <app-form-checkbox formControlName="name" [formControlField]="f.name"
    label="test label">
  </app-form-checkbox>
```
