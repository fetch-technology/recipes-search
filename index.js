const fetch = require('cross-fetch')
const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'debug'
})

const main = async _ => {
  await client.indices.delete({ index: 'recipes' })
  await client.indices.create({ index: 'recipes' })

  let url, response, total = 0

  url = new URL('https://www.cooky.vn/directory/search')
  url.searchParams.append('q', null)
  url.searchParams.append('st', 2)
  url.searchParams.append('page', 1)
  url.searchParams.append('append', true)
  url.searchParams.append('video', false)

  response = await fetch(url).then(resp => resp.json())
  total = response.totalResults

  for (let i = 1; i < Math.ceil(total / 12); i += 1) {
    url.searchParams.set('page', i)
    response = await fetch(url).then(resp => resp.json())

    await Promise.all(
      response.recipes.map(recipe => client.index({
        index: 'recipes',
        type: 'recipe',
        id: recipe.Id,
        body: recipe
      }))
    )
  }
}

main()
