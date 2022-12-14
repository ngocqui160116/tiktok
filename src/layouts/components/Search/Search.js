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
import * as searchService from '~/services/searchService';

const cx = classNames.bind(styles);

function Search(){
    const [searchValue,setSearchValue] = useState('');
    const [searchResult,setSearchResult] = useState([])
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue,500);

    const inputRef = useRef();

    useEffect(() =>{
        if(!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () =>{
            setLoading(true);

            const result = await searchService.search(debouncedValue)
            setSearchResult(result);

            setLoading(false);
        }

        fetchApi();
    },[debouncedValue])

    const handleHideResult = () =>{
        setShowResult(false);
    }

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by 
        //creating a new parentNode context. 
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={attrs =>(
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PoperWrapper>
                            <h4 className={cx('search-title')}>
                                T??i kho???n
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
                        placeholder='T??m ki???m t??i kho???n v?? video' 
                        spellCheck={false} 
                        onChange={e => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue.trim() && !!searchValue && !loading && (
                        <button 
                            className={cx('clear')} 
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    { loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> }
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}
export default Search;