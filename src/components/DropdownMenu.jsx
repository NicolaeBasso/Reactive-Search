import { Menu } from 'antd';

export const DropdownMenu = (props) => {
  let index = 0;

  return (
    <Menu>
      {props.dataSet?.slice(0, 10).map((x) => (
        <Menu.Item key={index++}>{x}</Menu.Item>
      ))}
    </Menu>
  );
};
