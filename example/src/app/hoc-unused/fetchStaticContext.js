import React, { Component } from 'react';
import axios from 'axios';

export default function fetchStaticContext(WrappedComponent, config) {
  class FetchStaticContext extends Component {

    constructor(props) {
      super(props);
      this.state = {
        context: null
      }
    }

    componentDidMount() {
      // const url = 'https://api.cosmicjs.com/v1/simple-react-blog/object/a-wonderful-blog-post-about-earth?read_key=&props=title,content,metadata';
      const {url, name} = config;
      // console.log('component name', name);
      // console.log('pathname', this.props.location.pathname);
      setTimeout(() => {
        this.fetchStaticContext(url);
      }, 1000);
    }
    
    fetchStaticContext = async url => {
      const response = await axios.get(url);
      return this.setState({
        context: response.data,
      });
    };

    render() {
      const page = this.state.context;
      if(!page) {
        return <div>Loading context from server...</div>
      }
      return <WrappedComponent {...this.props} context={this.state.context} />;
    }
  };

  return FetchStaticContext;
}

