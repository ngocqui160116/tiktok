import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark,faMagnifyingGlass,faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PoperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Header(){

    const [searchResult,setSearchResult] = useState([])
    
    useEffect(() =>{
        setTimeout(() => {
            setSearchResult([1,2,3])
        }, 0);
    },[])

    return (
        <header className= {cx('wrapper')} >
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok"/>
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={attrs =>(
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PoperWrapper>
                                <h4 className={cx('search-title')}>
                                    Tài khoản
                                </h4>
                                <AccountItem/>
                                <AccountItem/>
                                <AccountItem/>
                            </PoperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder='Tìm kiếm tài khoản và video' spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <h1>actions</h1>
                </div>
            </div>
        </header>)
}
export default Header;