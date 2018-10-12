const fetch = require('cross-fetch')

const main = async _ => {
  let url, response, total = 0

  url = new URL('https://www.cooky.vn/directory/search')
  url.searchParams.append('q', null)
  url.searchParams.append('st', 2)
  url.searchParams.append('page', 1)
  url.searchParams.append('append', true)
  url.searchParams.append('video', false)

  response = await fetch(url).then(resp => resp.json())
  total = response.totalResults

  for (let i = 1; i < 10 /*Math.ceil(total / 12)*/; i += 1) {
    url.searchParams.set('page', i)
    response = await fetch(url).then(resp => resp.json())
    console.log(response)
  }
}

main()
