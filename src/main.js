import * as React from 'react'
import * as ReactDOM from 'react-dom'


class Application extends React.Component {

  render() {
    return (
      <h1>Hello, Tung</h1>
    )
  }
}

const render = () => ReactDOM.render((
  <Application />
), document.querySelector('#app'))


render()

if (module.hot) {
  module.hot.accept('./', () => render())
}
