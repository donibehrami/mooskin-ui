import * as React from 'react';

import styles from './Slider.css';

interface IDocumentProps {
    documentMode?: any;
    StyleMedia?: any;
}

import {IInputCallbackData} from '../_utils/types/commonTypes';

export interface ISliderProps{

    /** id of the component */
    id?: string;

    /** override Slider classes */
    className?: string;

    /** override Slider styles */
    style?: React.CSSProperties;

    /** wether the Slider is disabled */
    disabled?: boolean;

    /** Slider label */
    label?: string;

    /** adds track labels to the Slider */
    trackLabels?: boolean;

    /** adds current value tooltip to the Slider on sliding */
    tooltip?: boolean;

    /** value of the Slider */
    value: string | number;

    /** fill className */
    fillClassName?: string;

    /** styles for fill */
    fillStyle?: React.CSSProperties;

    /** range of the Slider */
    range?: number[];

    /** custom values for the Slider */
    values?: Array<number | string>;

    /** what data is being used, helps whn extracting user input, you know on what field changes are made */
    dataLabel?: string;

    /** callback that is called when the Slider changes */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, data: IInputCallbackData) => void;
}

export interface ISliderState {
    dragging: boolean;
    left: number;
    fill: any;
}

export default class Slider extends React.Component<ISliderProps, ISliderState>{

    slider: any;

    constructor(props: ISliderProps){
        super(props);

        this.state = {
            dragging: false,
            fill: <div/>,
            left: 0
        };
    }

    componentDidMount(){
        this.renderFill();
    }

    componentWillReceiveProps(){
        this.renderFill();
    }

    render(){

        const {label, tooltip, trackLabels} = this.props;

        const slider = this.renderSlider();

        return (
            <div className={`${styles.sliderContainer}`}>
                {label && <label className={styles.sliderLabel} >{label}</label>}
                {slider}
                {!this.isEdge() && this.state.fill}
                {trackLabels && this.renderTrackLabels()}
                {tooltip && this.renderTooltip()}
            </div>
        );
    }

    renderSlider = () => {
        if (this.props.range){
            // return this.rangeSlider();
            const min = this.props.range ? this.props.range[0] : 1;
            const max = this.props.range ? this.props.range[1] : 100;
            return this.getSliderWithType(min, max, this.props.value as number, this.onSliderChange);
        } else if (this.props.values) {
            const min = 0;
            const max = this.props.values ? this.props.values.length - 1 : 100;
            const value = this.props.values && this.props.values.indexOf(this.props.value);
            return this.getSliderWithType(min, max, value, this.onValuesSliderChange);
        }
    }

    getSliderWithType = (min: number, max: number, value: number, callback: any) => {

        const disabled = this.props.disabled ? styles.disabled : '';
        const edgeClasses = this.isEdge() ? styles.edgeClasses : '';

        return (
            <input
                ref={(slider) => this.slider = slider}
                id={this.props.id}
                style={this.props.style}
                className={`${styles.slider} ${disabled} ${edgeClasses} ${this.props.className}`}
                value={value}
                min={min}
                max={max}
                type="range"
                onChange={callback}
                disabled={this.props.disabled}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
            />
        );
    }

    renderTrackLabels = () => {

        const {range, values} = this.props;
        let type: any[] = [];

        if (range){
            type = range;
        } else if (values){
            type = values;
        } else {
            return '';
        }

        const labels = type.map((label, i) => {
            return <span key={i} className={styles.trackLabel}>{label}</span>;
        });

        return (
            <div className={styles.trackLabels}>
                {labels}
            </div>
        );
    }

    renderTooltip = () => {
        const display = this.state.dragging ? {} : {display: 'none'};
        const top = this.props.label ? {} : {top: -40};
        return (
            <div
                style={{...display, left: this.state.left, ...top}}
                className={styles.tooltip}
            >
                {this.props.value}
            </div>
        );
    }

    onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange &&
        this.props.onChange(e, {value: e.target.value, dataLabel: this.props.dataLabel});
    }

    onValuesSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.props.values && this.props.values[e.target.value as any];
        this.props.onChange &&
        this.props.onChange(e, {value, dataLabel: this.props.dataLabel});
    }

    onMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
        // const mouseStart = window.innerWidth - e.pageX;
        const {dragging} = this.state;
        if (dragging) {
            // console.log(e.nativeEvent.offsetX);
            const left = this.getPosition(e);
            this.setState({left});
        }
    }

    getPosition = (e: React.MouseEvent<HTMLInputElement>) => {
        // let pos = e.nativeEvent.offsetX;
        const sliderWidth = this.slider.offsetWidth - 25;
        if (e.nativeEvent.offsetX < 0){
            return 0;
        } else if (e.nativeEvent.offsetX > sliderWidth){
            return sliderWidth;
        } else {
            return e.nativeEvent.offsetX;
        }
    }

    getThumbPosition = () => {
        // const width = this.slider ? this.slider.value / this.slider.max : 50;
        const pos = this.slider.value / this.slider.max;
        const thumbPos = this.slider.clientWidth * pos;
        const width = 100 / (this.slider.clientWidth / thumbPos);
        return width > 98 ? 98 : width;
    }

    renderFill = () => {
        const {fillClassName, fillStyle} = this.props;
        const width = this.slider ? this.getThumbPosition() + '%' : '0%';
        const top = this.props.label ? {top: '23px'} : {};
        const disabled = this.props.disabled ? styles.disabledFill : '';
        const fill = (
            <div className={`${styles.fill} ${disabled} ${fillClassName}`} style={{width, ...top, ...fillStyle}} />
        );
        this.setState({fill});
    }

    onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        const left = this.getPosition(e);
        this.setState({dragging: true, left});
    }

    onMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        this.setState({dragging: false});
    }

    isEdge = () => {
        // tslint:disable-next-line
        const doc = document as IDocumentProps;
        const win = window as IDocumentProps;
        const isIE = false || !!doc.documentMode as IDocumentProps;
        const isEdge = !isIE && !!win.StyleMedia;
        return isEdge;
    }

}