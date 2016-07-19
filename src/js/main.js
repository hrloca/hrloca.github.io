import React from 'react'
import { render } from 'react-dom'

class Root extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>hello world.</div>
    )
  }

}

const rootElement = document.getElementById('app')

render(<Root />, rootElement)
