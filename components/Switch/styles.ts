import styled from 'styled-components';
import variables from '../_utils/globals/variables';

import { ISwitchComponentProps } from './model';

export const SwitchContainer = styled.div<ISwitchComponentProps>`
    display: flex;
`;

export const SwitchStyled = styled.div<ISwitchComponentProps>`
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${(props) => props.width}px;
    height: 27px;
    padding: 0 8px;
    cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    border-radius: 36px;
    transition: background-color 0.3s;
    background-color: ${(props) => {
        return !props.disabled
            ? props.on
                ? props.theme.primaryColor || props.primaryColor
                : props.theme.secondaryColor || props.secondaryColor
            : props.theme.backgroundDisabled || variables.backgroundDisabled;
    }};
`;

export const SwitchHandle = styled.div<ISwitchComponentProps>`
    position: absolute;
    content: '';
    top: 4px;
    left: 4px;
    height: 19px;
    width: 19px;
    background-color: white;
    transition: transform 0.3s;
    border-radius: 50%;
    z-index: 1;
    transform: ${(props) => (props.on ? `translate(${props.width ? props.width - 27 : 63}px)` : '')};
`;

export const SwitchLabel = styled.div<ISwitchComponentProps>`
    font-family: Hind;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
`;

export const SwitchLabelNormal = styled(SwitchLabel)<ISwitchComponentProps>`
    align-self: ${(props) => (props.on ? 'flex-start' : 'flex-end')};
`;

export const SwitchLabelDisabled = styled(SwitchLabel)<ISwitchComponentProps>`
    color: #9d9d9d;
    align-self: center;
`;