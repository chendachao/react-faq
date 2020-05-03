import React, { Component } from 'react';
import Dock from 'react-dock';

import styles from './styles.module.css';

class FAQDock extends Component {
  defaultDockConfig = {
    position: 'right',
    isVisible: false,
    fluid: false,
    dimMode: 'opaque',
    // dimMode: 'none',
    dimStyle: { background: 'transparent' },
    size: 300,
    dockStyle: {
      top: 'auto',
      bottom: 0,
      height: '60%',
      padding: '6px',
    },
  };

  constructor(props) {
    super(props);
    let { config } = props;
    config = config || {};
    this.state = {
      dockConfig: {
        ...this.defaultDockConfig,
        ...config,
      },
    };
  }

  handleVisibleChange = (isVisible) => {
    this.setState({
      dockConfig: {
        isVisible,
      },
    });
  };

  handleSizeChange = (size) => {
    this.setState({
      dockConfig: {
        size,
      },
    });
  };

  render() {
    const {
      isVisible,
      dimMode,
      dimStyle,
      size,
      dockStyle,
      fluid,
      position,
    } = this.state.dockConfig;
    let { children, title } = this.props;
    title = title || 'FAQ Dock';
    return (
      <Dock
        position={position}
        isVisible={isVisible}
        dimMode={dimMode}
        fluid={fluid}
        size={size}
        dimStyle={dimStyle}
        dockStyle={dockStyle}
        onSizeChange={this.handleSizeChange}
        onVisibleChange={this.handleVisibleChange}
      >
        <button
          className={styles.helpDockCloseIcon}
          onClick={() => this.setState({ isVisible: !isVisible })}
        >
          <svg width='29' height='29'>
            <path
              d='M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62'
              fillRule='evenodd'
            />
          </svg>
        </button>
        <div className={styles.cpHelpContainer}>
          <div className={styles.cpHelpTitle}>{title}</div>
          {children}
        </div>
      </Dock>
    );
  }
}

export default FAQDock;
