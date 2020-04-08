import { CheckboxComponent } from "../checkbox.component";
import checkboxNotes from './checkbox.md';

export default {
  title: 'Form checkbox',
  parameters: {
    notes: { checkboxNotes },
  }
}

export const usageNotes = () => ({
  component: CheckboxComponent
});
