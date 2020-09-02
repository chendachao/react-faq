import React, { Component } from 'react';
import { withCacheFetch, request } from '../utils';

export default function withStaticContext(WrappedComponent, config) {
  class BaseComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        context: null,
      };
    }

    loadContext = async (url) => {
      const response = await withCacheFetch(request, url);
      return this.setState({
        context: response,
      });
    };

    componentDidMount() {
      // const url = 'https://api.cosmicjs.com/v1/simple-react-blog/object/a-wonderful-blog-post-about-earth?read_key=&props=title,content,metadata';
      if (config) {
        const { url, name } = config;
        console.log('component name', name);
        console.log('pathname', this.props.location.pathname);
        setTimeout(() => {
          this.loadContext(url);
        }, 1000);
      }
    }

    render() {
      const { context } = this.state;
      if (!context) {
        return config.fallback;
      }
      return <WrappedComponent {...this.props} context={this.state.context} />;
    }
  }

  return BaseComponent;
}
