import * as React from 'react'
import * as ReactDOM from 'react-dom'

const baseUrl = new URL('http://localhost:9200/recipes/recipe/_search')


class Application extends React.Component {

  state = {
    results: []
  }

  _handleSearch = (e) => {
    e.preventDefault()

    baseUrl.searchParams.set('q', e.target.query.value)

    fetch(baseUrl)
     .then(resp => resp.json())
     .then(resp => this.setState({
       results: resp.hits.hits.map(hit => hit._source)
     }))
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSearch}>
          <label htmlFor="query">Search</label>
          <input name="query" type="search"/>
        </form>
        {this.state.results.map(r => (
          <div key={r.Id}>
            <h4>{r.Name}</h4>
          </div>
        ))}
      </div>
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
