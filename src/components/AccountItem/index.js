import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem(){
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} 
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/ddcb57a7bcd8bf0fc01c18338b2caf59~c5_300x300.webp?x-expires=1660446000&x-signature=d%2FYtIkjiKvRfUG9xWFkIe%2FoOHsc%3D"
                alt="avatar"/>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}/>
                </h4>
                <span className={cx('username')}>nguyen van a</span>
            </div>
            
        </div>
    )
}
export default AccountItem;