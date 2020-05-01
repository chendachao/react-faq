import React, { Component } from 'react';
import Dock from "react-dock";

import styles from './styles.scss';

class FAQDock extends Component {
  defaultDockConfig = {
    isVisible: false,
    dimMode: 'opaque',
    size: 300,
    dockStyle: {
      top: 'auto',
      bottom: 0,
      height: '60%',
      padding: '6px'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ...this.defaultDockConfig,
      isVisible: props.isVisible,
      // dimMode: 'none',
    }

  }

  render() {
    const {isVisible, dimMode, size, dockStyle} = this.state;
    const {children} = this.props;
    return (
      <Dock position='right'
        isVisible={isVisible}
        dimMode={dimMode}
        fluid={false}
        size={size}
        dimStyle={{ background: 'transparent' }}
        dockStyle={dockStyle}
        onSizeChange={this.handleSizeChange}
        onVisibleChange={this.handleVisibleChange}
      >
        <span onClick={() => this.setState({ isVisible: !isVisible })}>
          <button className={styles.helpDockCloseIcon}>
            <svg class="x-29px_svg__svgIcon-use" width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fill-rule="evenodd"></path></svg>
          </button>
        </span>
        {children}
      </Dock>
    );
  }

  handleVisibleChange = isVisible => {
    this.setState({ isVisible });
  }

  handleSizeChange = size => {
    this.setState({ size });
  }

}

export default FAQDock;

