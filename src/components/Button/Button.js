import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ 
    href,
    to, 
    primary = false,
    outline = false,
    text = false,
    small = false,
    large = false, 
    disabled = false,
    rounded = false,
    leftIcon,
    rightIcon,
    className,
    children, 
    onClick,
    ...passprops
}){
    let Component = 'button';
    const props = {
        onClick,
        ...passprops,
    }
    if(disabled){
        Object.keys(props).forEach((key)=>{
            if(key.startsWith('on') && typeof props[key] === 'function'){
                delete props[key];
            }
        })
    }

    if(to){
        props.to = to;
        Component = Link;
    }
    else if(href){
        props.href = href;
        Component = 'a';
    }
    const classes = cx('wrapper',{
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        [className]: className,
    });
    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

Button.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}

export default Button;