import React, { useEffect } from "react";
import { Menu, Icon, Button } from 'antd';
import history from "../utils/history";
import {DefaultSelect} from "../utils/getDefaultSelected";
import 'antd/dist/antd.css';

const SideNav = () => {
  useEffect(() => {}, [DefaultSelect()]);
    return (
      <div style={{ width: '100%', height: '100%'}}>
        <Menu
          defaultSelectedKeys={[DefaultSelect(window.location.pathname)]}
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
          <Menu.Item key="3" onClick={() => history.push("/burn-cal")}>
            <Icon type="inbox" />
            <span>Burn calories</span>
          </Menu.Item>
        </Menu>
      </div>
    );
}

export default SideNav;
