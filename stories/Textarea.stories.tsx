import React from 'react';

import { Meta, Story } from '@storybook/react/dist/client/preview/types-6-0';

import { ITextAreaComponentProps } from '../components/TextArea/model';
import TextArea from '../components/TextArea/TextArea';

import { IInputCallbackData } from '../components/index';
import GlobalStyle from '../components/Styled/GlobalStyles';

export default ({
    component: TextArea,
    title: 'Example/TextArea',
} as any) as Meta;

const Template: Story<ITextAreaComponentProps> = (args) => {
    return (
        <>
            <GlobalStyle />
            <TextArea {...args} />
        </>
    );
};

export const Normal = Template.bind({});
Normal.args = {
    label: 'TextArea Label:',
    onChange: (e: React.MouseEvent<HTMLDivElement>, data: IInputCallbackData) => console.log(e, data),
    value: 'test'
};