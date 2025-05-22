import { Context } from "runed";
class DateRangePickerRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
    }
}
export const DateRangePickerRootContext = new Context("DateRangePicker.Root");
export function useDateRangePickerRoot(props) {
    return DateRangePickerRootContext.set(new DateRangePickerRootState(props));
}
