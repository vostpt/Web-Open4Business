# Form search input

This component is used to display a search input to be used in a form.
This component will automatically update its value in form after any change.

## Inputs

| Input                 | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **formControlField**  | Form control field reference. Used so that the input can update its value in the form    |
| **id**                | Id of the input. If not provided, it is generated an UUID                                |
| **label**             | Label to be shown next to the checkbox                                                   |
| **placeholder**       | Placeholder to be displayed when input is empty                                          |
| **autofocus**         | Determines if the input will be the field automatically focused                          |
| **tooltip**           | Tooltip to be displayed on hover                                                         |
| **size**              | Determines the size of the input ('large'). If not provided, remains with a normal size  |


**Example:**

```
  <app-catalog-form-search-input formControlName="search" [formControlField]="f.search" label="{{'dictionary.search' | translate}}">
  </app-catalog-form-search-input>
```
