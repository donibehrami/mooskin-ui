import * as React from 'react';

import styles from './DatePicker.css';

import 'input-moment/dist/input-moment.css';

import InputMoment from 'input-moment';
import moment from 'moment';

import {IInputCallbackData} from '../_utils/types/commonTypes';

export interface IDateProps{

    /** component id */
    id?: string;

    /** date passed will be the selected date */
    date?: any;

    /** datepicker placeholder */
    placeholder?: string;

    /** format the labeled date */
    format?: string;

    /** DatePicker class */
    className?: string;

    /** datepicker label */
    label?: string;

    /** with of the label within the datepicker container */
    labelWidth?: number;

    /** wether this input is disabled or not */
    disabled?: boolean;

    /** wether this input is required or not */
    required?: boolean;

    /** override DatePicker styles */
    style?: React.CSSProperties;

    /** what data is being used, helps whn extracting user input, you know on what field changes are made */
    dataLabel?: string;

    /** callback that is called when the input changes */
    onChange?: (data: IInputCallbackData) => void;
}

export interface IDateState{
    displayPicker: boolean;
}

export default class DatePicker extends React.Component<IDateProps, IDateState>{

    static defaultProps = {
        className: '',
        format: 'DD MMM YYYY, H:mm',
        style: {}
    };

    constructor(props: IDateProps){
        super(props);

        this.state = {
            displayPicker: false
        };
    }

    render(){

        const displayPicker = !this.state.displayPicker ? 'none' : 'block';
        const disabledClasses = !this.props.disabled ? '' : styles.disabled;
        const spacing = !this.props.labelWidth ? {} : {flexBasis: `${this.props.labelWidth}px`};
        const value = this.props.date ? moment(this.props.date).format(this.props.format) : undefined;

        return(
            <div
                id={this.props.id}
                className={`datepicker-component ${this.props.className} ${styles.datePicker}`}
                style={this.props.style}
            >
                {this.props.label && <label className={styles.label} style={spacing} >{this.props.label}</label>}
                <div className={styles.wrapper}>
                    <input
                        readOnly
                        value={value}
                        onClick={this.toggle}
                        className={`${styles.dateInput} ${disabledClasses}`}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        placeholder={this.props.placeholder}
                    />
                    <div className={styles.calendar} style={{display: displayPicker}}>
                        <InputMoment
                            moment={moment(this.props.date)}
                            onChange={this.onChange}
                            onSave={this.toggle}
                        />
                        <div className={styles.cover} onClick={this.toggle}/>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (date: any) => {
        // !this.props.disabled &&
        this.props.onChange &&
        this.props.onChange({value: date.format('x'), dataLabel: this.props.dataLabel});
    }

    toggle = () => {
        this.setState({displayPicker: !this.state.displayPicker});
    }

}
