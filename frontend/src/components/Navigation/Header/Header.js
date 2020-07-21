import React, { Component } from "react";
import { Header, Image } from "semantic-ui-react";
import DrawerToggle from "../../UI/DrawerToggle/DrawerToggle";
import logo from "../../../Assets/Images/logo.png";
import NavigationItems from "./NavigationItems/NavigationItems";
import Sidebar from "./Sidebar/Sidebar";
import "./Header.css";

class MainHeader extends Component {
  state = {
    showSidebar: false,
  };

  handleSidebarToggle = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <div className="header-navabr">
        <div className="header-navbar__logo">
          <Image src={logo} className="logo" />
          <Header size="huge" className="company-name">
            driblets
          </Header>
        </div>
        <div className="header-navbar__item">
          <DrawerToggle clicked={this.handleSidebarToggle} />
          <Sidebar
            show={this.state.showSidebar}
            clicked={this.handleSidebarToggle}
          />
          <nav className="desktop-only">
            <NavigationItems />
          </nav>
        </div>
      </div>
    );
  }
}

export default MainHeader;
