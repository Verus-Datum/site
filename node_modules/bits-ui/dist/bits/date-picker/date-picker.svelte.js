import { Context } from "runed";
class DatePickerRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
    }
}
export const DatePickerRootContext = new Context("DatePicker.Root");
export function useDatePickerRoot(props) {
    return DatePickerRootContext.set(new DatePickerRootState(props));
}
