import React, { useState } from 'react';

import styles from './index.module.scss';

import { SearchIcon } from '@/public/icons';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleEnterDown = (event: any) => {
    if (event.key === 'Enter') {
      onSearch(searchText);
    }
  };

  return (
    <div className={styles.formItem}>
      <div className={styles.searchInput}>
        <input
          type="text"
          onKeyDown={handleEnterDown}
          onChange={(word) => handleSearchText(word.target.value)}
        />
        <div onClick={() => onSearch(searchText)} className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
