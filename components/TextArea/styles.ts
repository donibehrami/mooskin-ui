import styled from 'styled-components';

import Box from '../Box/Box';

// import variables from '../_utils/globals/variables';

import { ITextAreaComponentProps } from './model';

export const StyledTextAreaContainer = styled(Box)`
    display: flex;
`;

export const StyledTextAreaWrapper = styled(Box)<Partial<ITextAreaComponentProps>>`
    display: flex;
    flex-direction: column;
`;

export const StyledTextArea = styled.textarea`
    padding: 11px;
    border-radius: 3px;
    border: solid 1px #e2e2e2;
    background-color: #ffffff;
    font-family: Hind;
    font-size: 12px;
    color: #9d9d9d;
`;