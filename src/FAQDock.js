import React, { Component } from 'react';
import Dock from 'react-dock';

import styles from './styles.module.css';

class FAQDock extends Component {
  render() {
    const {
      isVisible,
      dimMode,
      dimStyle,
      size,
      dockStyle,
      fluid,
      position,
    } = this.props.config;
    const {
      handleVisibleChange,
      handleSizeChange,
      toggleHeight,
      children,
    } = this.props;
    const title = this.props.title || 'FAQ Dock';
    const { height } = dockStyle;
    const fullHeight = height === '100%';

    return (
      <Dock
        position={position}
        isVisible={isVisible}
        dimMode={dimMode}
        fluid={fluid}
        size={size}
        dimStyle={dimStyle}
        dockStyle={dockStyle}
        onSizeChange={handleSizeChange}
        onVisibleChange={handleVisibleChange}
      >
        <button
          className={styles.helpDockCloseIcon}
          onClick={() => handleVisibleChange(!isVisible)}
        >
          <svg width='28' height='28'>
            <path
              d='M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62'
              fillRule='evenodd'
            />
          </svg>
        </button>
        <button
          className={styles.helpDockMaxMinIcon}
          onClick={() => toggleHeight({ height: fullHeight ? '60%' : '100%' })}
        >
          {fullHeight ? (
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 469.333 469.333'
              xmlSpace='preserve'
            >
              <g>
                <g>
                  <g>
                    <path
                      d='M160,0h-21.333C132.771,0,128,4.771,128,10.667V128H10.667C4.771,128,0,132.771,0,138.667V160
				c0,5.896,4.771,10.667,10.667,10.667H160c5.896,0,10.667-4.771,10.667-10.667V10.667C170.667,4.771,165.896,0,160,0z'
                    />
                    <path
                      d='M458.667,128H341.333V10.667C341.333,4.771,336.563,0,330.667,0h-21.333c-5.896,0-10.667,4.771-10.667,10.667V160
				c0,5.896,4.771,10.667,10.667,10.667h149.333c5.896,0,10.667-4.771,10.667-10.667v-21.333
				C469.333,132.771,464.563,128,458.667,128z'
                    />
                    <path
                      d='M458.667,298.667H309.333c-5.896,0-10.667,4.771-10.667,10.667v149.333c0,5.896,4.771,10.667,10.667,10.667h21.333
				c5.896,0,10.667-4.771,10.667-10.667V341.333h117.333c5.896,0,10.667-4.771,10.667-10.667v-21.333
				C469.333,303.437,464.563,298.667,458.667,298.667z'
                    />
                    <path
                      d='M160,298.667H10.667C4.771,298.667,0,303.437,0,309.333v21.333c0,5.896,4.771,10.667,10.667,10.667H128v117.333
				c0,5.896,4.771,10.667,10.667,10.667H160c5.896,0,10.667-4.771,10.667-10.667V309.333
				C170.667,303.437,165.896,298.667,160,298.667z'
                    />
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 384.97 384.97'
              xmlSpace='preserve'
              width='28'
              height='28'
            >
              <g>
                <g id='Fullscreen'>
                  <path
                    d='M384.97,12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833,0-11.922,5.39-11.934,12.223
			c0,6.821,5.101,11.838,11.934,11.838h96.062l-0.193,96.519c0,6.833,5.197,12.03,12.03,12.03c6.833-0.012,12.03-5.197,12.03-12.03
			l0.193-108.369c0-0.036-0.012-0.06-0.012-0.084C384.958,12.09,384.97,12.066,384.97,12.03z'
                  />
                  <path
                    d='M120.496,0H12.403c-0.036,0-0.06,0.012-0.096,0.012C12.283,0.012,12.247,0,12.223,0C5.51,0,0.192,5.317,0.192,12.03
			L0,120.399c0,6.833,5.39,11.934,12.223,11.934c6.821,0,11.838-5.101,11.838-11.934l0.192-96.339h96.242
			c6.833,0,12.03-5.197,12.03-12.03C132.514,5.197,127.317,0,120.496,0z'
                  />
                  <path
                    d='M120.123,360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0,257.833,0,264.667v108.092
			c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096c0,6.713,5.317,12.03,12.03,12.03h108.092
			c6.833,0,11.922-5.39,11.934-12.223C132.057,365.926,126.956,360.909,120.123,360.909z'
                  />
                  <path
                    d='M372.747,252.913c-6.833,0-11.85,5.101-11.838,11.934v96.062h-96.242c-6.833,0-12.03,5.197-12.03,12.03
			s5.197,12.03,12.03,12.03h108.092c0.036,0,0.06-0.012,0.084-0.012c0.036-0.012,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V264.847C384.97,258.014,379.58,252.913,372.747,252.913z'
                  />
                </g>
              </g>
            </svg>
          )}
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
