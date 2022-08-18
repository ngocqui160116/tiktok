import { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "~/assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(({className,src, alt,fallBack: fallBackOutput = images.defaultImage,  ...props}, ref) => {
    
    const[fallBack,setFallBack] = useState('')
    
    const handleError = () => {
        setFallBack(fallBackOutput)
    }

    return (
        <img 
            className={classNames(styles.wrapper, className)}
            src={fallBack || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
})
export default Image;