import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCircleQuestion, faCircleXmark,faCloudUpload,faEarthAsia,faEllipsisVertical,faGear,faKeyboard,faMagnifyingGlass,faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}/>,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data:[
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title: 'Phím tắt',
    }
];

function Header(){
    const currentUser = true

    const [searchResult,setSearchResult] = useState([])
    
    useEffect(() =>{
        setTimeout(() => {
            setSearchResult([])
        }, 0);
    },[])

    const handleMenuChange = (menuItem) => {
        switch(menuItem.type) {
            case 'language':
                //handle change to language
                break;
            default:
        }
    }
    const userMenu=[
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'Xem hồ sơ',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faBitcoin}/>,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear}/>,
            title: 'Cài đặt',
            to: '/feedback',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket}/>,
            title: 'Đăng xuất',
            to: '/feedback',
            separate: true
        },
    ]

    return (
        <header className= {cx('wrapper')} >
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok"/>
                </div>
                <HeadlessTippy
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
                </HeadlessTippy>
                <div className={cx('actions')}>

                    {currentUser ? (
                        <>
                            <Tippy delay={[0,100]} content='Tải video' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                            <>
                                <Button text >
                                Tải lên
                                </Button>
                                <Button primary >
                                    Đăng nhập
                                </Button>
                            </>
                    )}                  
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ?(
                            <img 
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f75993e97bd5424690cb3c702fc88b0d~c5_100x100.jpeg?x-expires=1660705200&x-signature=jrIYGb9uGUbsRukNwIjkc4k6wHs%3D"
                                className={cx('user-avatar')} 
                                alt='Nguyen Van A'
                            />
                        ):(
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>)
}
export default Header;