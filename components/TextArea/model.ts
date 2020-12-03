import { IBoxComponentProps } from '../Box/model';
import { IInputCallbackData } from '../index';

export interface ITextAreaComponentProps extends IBoxComponentProps {
    /** provide to make the textarea field disabled */
    disabled?: boolean;

    /** provide to make the textarea field required */
    required?: boolean;

    /** specify textarea columns */
    cols?: number;

    /** specify textarea rows */
    rows?: number;

    /** override textarea value */
    value: string;

    /** override textarea placeholder */
    placeholder?: string;

    /** override textarea minlength */
    minlength?: number;

    /** override textarea maxlength */
    maxlength?: number;

    /** textarea label */
    label?: string;

    /** textarea description (small italic bottom) */
    description?: string;

    /** spacing between label and textarea */
    labelWidth?: number;

    /** toggle readonly textarea */
    readonly?: boolean;

    /** what data is being used, helps whn extracting user input, you know on what field changes are made */
    dataLabel?: string;

    /** callback that is called when the textarea changes */
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, data: IInputCallbackData) => void;

}
