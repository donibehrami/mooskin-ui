import * as React from 'react';

import Label from '../Label/Label';

import { ISwitchComponentProps } from './model';

import { SwitchHandle, SwitchLabelDisabled, SwitchLabelNormal, SwitchStyled } from './styles';

import { getBoxProps } from '../_utils/helper';
import { Box } from '../Box/Box';

export const Switch: React.FC<ISwitchComponentProps> = (props) => {
    const renderDisabledContent = () => {
        return <SwitchLabelDisabled>{props.disabledLabel}</SwitchLabelDisabled>;
    };

    const renderSwitchContent = () => {
        return <SwitchLabelNormal on={props.on}>{props.on ? props.onLabel : props.offLabel}</SwitchLabelNormal>;
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        !props.disabled && props.onClick && props.onClick(e, { value: !props.on, dataLabel: props.dataLabel });
    };

    return (
        <Box d="flex" {...getBoxProps(props)} onClick={onClick}>
            {props.label && <Label width={props.labelWidth}>{props.label}</Label>}
            <SwitchStyled
                w={props.width}
                on={props.on}
                disabled={props.disabled}
            >
                {!props.disabled && <SwitchHandle on={props.on} width={props.width} />}
                {props.disabled ? renderDisabledContent() : renderSwitchContent()}
            </SwitchStyled>
        </Box>
    );
};

Switch.defaultProps = {
    className: '',
    disabledLabel: 'INCOMPLETE',
    offLabel: 'INACTIVE',
    onLabel: 'ACTIVE',
    style: {},
    width: 90
};

Switch.displayName = 'Switch';

export default Switch;
