import React, { useState } from 'react';
import { Dropdown, Input, List, Menu, Space } from 'antd';
import { countryList } from '../datasets/countryList';
import { defaultMenu } from '../datasets/defaultMenu';

const { Search } = Input;

export const SearchEngine = (props) => {
  const [state, setState] = useState({
    searchResults: countryList,
    dropdownOptions: defaultMenu,
    path: props.history.location.path,
  });

  const onInputSearch = (value) => {
    updateState(value);
  };
  const onInputChange = (event) => {
    updateState(event.target.value);
  };

  const updateState = (searchValue) => {
    const path = props.history.location.path;
    props.history.push(searchValue);
    const results = getSearchResults(countryList, searchValue);

    // update dropdown options according to results, limited to 10 elements
    let index = 0;
    const dropdownOptions = (
      <Menu>
        {results.slice(0, 10).map((el) => {
          return <Menu.Item key={index++}>{el}</Menu.Item>;
        })}
      </Menu>
    );

    // update state with newly computed data
    setState({
      searchResults: results,
      dropdownOptions: dropdownOptions,
      path: props.history.location.path,
    });
  };

  const getSearchResults = (dataSet, searchValue) => {
    /* lower both search value and compared value
       to check coincidence on characters only */
    const searchValueLowered = searchValue.toLowerCase();

    let results = dataSet.filter((el) => {
      const elLowered = el.toLowerCase();
      return elLowered.indexOf(searchValueLowered) >= 0;
    });

    // in this section the searched part of the element is made bold
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
      <Dropdown overlay={state.dropdownOptions} placement="bottomLeft" arrow>
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
