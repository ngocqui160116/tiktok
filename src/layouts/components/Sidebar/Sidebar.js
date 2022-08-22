import classNames from 'classnames/bind';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon, UserGroupIcon, LiveIcon, HomeActiveIcon,UserGroupActiveIcon,LiveActiveIcon} from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar(){
    return (
            <aside className = {cx('wrapper')}>
                <Menu>
                    <MenuItem title='Dành cho bạn' to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon/>}/>
                    <MenuItem title='Đang Follow' to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon/>}/>
                    <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon/>}/>
                </Menu>
            </aside>
        );
}
export default Sidebar;