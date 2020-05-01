import React, { Component } from 'react'

class Demo extends Component {
  render() {
    const {context: page} = this.props;
    return (
      <div style={{marginLeft: '100px', marginRight: '100px', marginBottom: '50px'}}>
        <h1>{page.section1.title}</h1>
        <img style={{width: `100%`}} src={`${page.section1.imgURL}?w=1000`} alt="img"/>
        <div dangerouslySetInnerHTML={{__html: page.section1.content}}></div>
      </div>  
    )
  }
}

export default Demo;

