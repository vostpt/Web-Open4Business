import { TextAreaComponent } from "../textarea.component";
import notes from './textarea.md';

export default {
  title: 'Form textarea',
  parameters: {
    notes: { notes },
  }
}

export const usageNotes = () => ({
  component: TextAreaComponent
});
