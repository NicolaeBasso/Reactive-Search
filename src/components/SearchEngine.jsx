import React, { useState } from 'react';
import { Dropdown, Input, List, Space } from 'antd';
import { countryList } from '../datasets/countryList';
import { DropdownMenu } from './DropdownMenu';

const { Search } = Input;

export const SearchEngine = (props) => {
  const [state, setState] = useState({
    searchResults: countryList,
    dropdownMenu: <DropdownMenu dataSet={countryList} />,
    path: props.history.location.path,
  });

  const onInputSearch = (value) => {
    updateState(value);
  };
  const onInputChange = (event) => {
    updateState(event.target.value);
  };

  const updateState = (searchValue) => {
    props.history.push(searchValue);
    const results = getSearchResults(countryList, searchValue);
    const dropdownMenu = <DropdownMenu dataSet={results} />;

    setState({
      dropdownMenu: dropdownMenu,
      searchResults: results,
      path: props.history.location.path,
    });
  };

  const getSearchResults = (dataSet, searchValue) => {
    const searchValueLowered = searchValue.toLowerCase();

    let results = dataSet.filter((el) => {
      const elLowered = el.toLowerCase();
      return elLowered.indexOf(searchValueLowered) >= 0;
    });

    results = results.map((el) => {
      const elLowered = el.toLowerCase();

      const indexFrom = elLowered.indexOf(searchValueLowered);
      const indexTo = indexFrom + searchValue.length;

      const left = el.substring(0, indexFrom);
      const middle = el.substring(indexFrom, indexTo);
      const right = el.substring(indexTo, el.length);

      return (
        <div>
          {left}
          {<b>{middle}</b>}
          {right}
        </div>
      );
    });

    return results;
  };

  return (
    <div className={'searchBar'}>
      <Dropdown overlay={state.dropdownMenu} placement="bottomLeft" arrow>
        <Space
          direction="vertical"
          className={'ant-dropdown-trigger searchInput'}
        >
          <Search
            className={'searchInputInner'}
            placeholder="Type to search..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onInputSearch}
            onChange={onInputChange}
          />
        </Space>
      </Dropdown>

      <div className={'searchResults'}>
        <List
          size="large"
          header={
            <div>
              <b>Search results:</b>
            </div>
          }
          footer={
            <div>
              <b>{state.searchResults.length}</b> items
            </div>
          }
          bordered
          dataSource={state.searchResults}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};
