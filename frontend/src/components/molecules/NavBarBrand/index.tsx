import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "assets/images/logo.svg";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import cx from "classnames";

interface NavBarBrandProps {
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

interface NavBarBrandState {
  iconRotate: boolean;
}

class NavBarBrand extends React.Component<NavBarBrandProps, NavBarBrandState> {
  brandIcon: HTMLImageElement | null;

  constructor(props: NavBarBrandProps) {
    super(props);
    this.state = { iconRotate: false };
    this.brandIcon = null;
  }

  componentDidMount() {
    if (this.brandIcon) {
      this.brandIcon.addEventListener("animationend", () =>
        this.rotatingDone()
      );
    }
  }

  componentWillUnmount() {
    if (this.brandIcon) {
      this.brandIcon.removeEventListener("animationend", () =>
        this.rotatingDone()
      );
    }
  }

  rotatingDone() {
    this.setState({
      iconRotate: false,
    });
  }

  render() {
    return (
      <Navbar.Brand className={styles.brandContainer}>
        <img
          src={logo}
          width="30"
          height="30"
          className={cx("d-inline-block", "align-center", styles.brandImage, {
            rotate: this.state.iconRotate,
          })}
          alt="Scientia logo"
          onClick={(e) => {
            this.setState({
              iconRotate: true,
            });
            this.props.onClick(e);
          }}
          ref={(elm) => {
            this.brandIcon = elm;
          }}
        />
        <Link to="/">Scientia</Link>
      </Navbar.Brand>
    );
  }
}

export default NavBarBrand;
