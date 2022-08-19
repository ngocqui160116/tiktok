import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCircleQuestion,faEarthAsia,faEllipsisVertical,faGear,faKeyboard,faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { Message, MessageBox } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

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
                },{
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
                    type: 'language',
                    code: 'vie',
                    title: 'Tiếng Việt'
                },{
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
    const currentUser = true;

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
                <Link to = {config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok"/>
                </Link>
                <Search />
                <div className={cx('actions')}>
                    <Button outline leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Tải lên
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0,50]} content='Tin nhắn' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <Message />
                                </button>
                            </Tippy>
                            <Tippy delay={[0,50]} content='Hộp thư' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <MessageBox />
                                    <span className={cx('badge')}>14</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                            <>
                                
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
                            <Image 
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