import React from "react";
import { Menu, Icon, Button } from 'antd';
import history from "../utils/history";
import 'antd/dist/antd.css';

class SideNav extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%'}}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{height: '100%'}}
        >
          <Menu.Item key="1" onClick={() => history.push("/")}>
            <Icon type="pie-chart"/>
            <span>Food Items</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push("/add-food")}>
            <Icon type="desktop" />
            <span>Add Food Items</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Calorie Info</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SideNav;
