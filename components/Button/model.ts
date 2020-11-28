export interface IButtonComponentProps {
    /** Button id attribute */
    id?: string;

    /** Provide to inverse the Button styles */
    inverseStyle?: boolean;

    /** Provide to make the Button disabled */
    disabled?: boolean;

    /** Button type */
    type?: string;

    /** Button href */
    href?: string;

    /** See Material Icons for icon type */
    icon?: string;

    /** Button primary color */
    primaryColor?: string;

    /** Button size */
    size?: 'lg' | 'md' | 'sm';

    /** Button className */
    className?: string;

    /** Override Button styles */
    style?: React.CSSProperties;

    /** Callback that's called when the button is clicked */
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}