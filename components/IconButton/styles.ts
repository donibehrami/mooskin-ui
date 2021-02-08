import styled from 'styled-components';

// Models
import { IIconButtonComponentProps } from './model';

// Components
import Box from '../Box/Box';

// "CSS" variables
// import variables from '../_utils/globals/variables';

export const StyledIconButton = styled(Box)<IIconButtonComponentProps>`
    font-family: 'Mooskin Icons';
    font-size: 21px;
    font-style: normal;
    color: #2d2d2d;
    text-decoration: none;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${(props) => props.disabled ? 0.7 : 1};
`;

StyledIconButton.displayName = 'StyledIconButton';
