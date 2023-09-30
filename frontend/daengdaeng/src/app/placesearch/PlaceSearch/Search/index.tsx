import React, { useState } from 'react';

import { SearchIcon } from '@/public/icons';

import styles from './index.module.scss';

type SearchProps = {
  isOpen: boolean;
  onSearch: (searchText: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <div className={styles.formItem}>
      <input
        type="text"
        onChange={(word) => handleSearchText(word.target.value)}
      />
      <div onClick={() => onSearch(searchText)}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
