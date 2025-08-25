import { format } from "date-fns";

export function formatDate(date: Date | string, formatStr: string = 'MM/dd/yyyy'): string {
    return format(new Date(date), formatStr);
}
