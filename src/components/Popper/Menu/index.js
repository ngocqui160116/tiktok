import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import {Wrapper as PoperWrapper} from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {}

function Menu({children, items = [], hideOnClick = false, onChange = defaultFn }) {

    const [history,setHistory] = useState([{data: items}]);
    const current = history[history.length - 1];

    const renderItems = () =>{
        return current.data.map((item,index)=> {
            //isParent return true if it have children
            const isParent = !!item.children
            return (
                <MenuItem key={index} data={item} onClick={() => {
                    if(isParent){
                        setHistory(prev => [...prev,item.children])
                    }
                    else{
                        onChange(item)
                    }
                }}/>
            );
        });
    }

    return (
        <Tippy
            hideOnClick={hideOnClick}
            onHide={() => {
                    setHistory(prev => prev.slice(0,1))
                }
            }
            offset={[12,8]}
            interactive
            delay={[0,600]}
            placement="bottom-end"
            render={attrs =>(
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Ngôn ngữ' onBack={() => {
                            setHistory(prev => prev.slice(0,prev.length-1))
                        }}/>}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PoperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}
export default Menu;