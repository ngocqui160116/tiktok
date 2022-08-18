import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search(){
    const [searchValue,setSearchValue] = useState('');
    const [searchResult,setSearchResult] = useState([])
    const [showResult,setShowResult] = useState(true);
    const [loading,setLoading] = useState(false);

    const debounced = useDebounce(searchValue,500);

    const inputRef = useRef();

    useEffect(() =>{
        if(!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data)
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    },[debounced])

    const handleHideResult = () =>{
        setShowResult(false);
    }

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={attrs =>(
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PoperWrapper>
                        <h4 className={cx('search-title')}>
                            Tài khoản
                        </h4>
                        {
                            searchResult.map((result) => (
                                <AccountItem key={result.id} data={result}/>
                            ))
                        }
                        
                    </PoperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input 
                    ref = {inputRef}
                    value={searchValue.trim() && searchValue}
                    placeholder='Tìm kiếm tài khoản và video' 
                    spellCheck={false} 
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {searchValue.trim() && !!searchValue && !loading && (
                    <button 
                        className={cx('clear')} 
                        onClick={() => {
                            setSearchValue('');
                            setSearchResult([]);
                            inputRef.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                { loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> }
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}
export default Search;