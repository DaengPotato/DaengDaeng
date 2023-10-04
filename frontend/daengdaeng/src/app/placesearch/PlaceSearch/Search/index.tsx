import React, { useState } from 'react';

import { SearchIcon } from '@/public/icons';

import styles from './index.module.scss';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <div className={styles.formItem}>
      <div className={styles.searchInput}>
        <input
          type="text"
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
