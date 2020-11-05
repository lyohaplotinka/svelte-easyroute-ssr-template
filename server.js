const express = require('express')
const app = express()
const fs = require('fs')

// Import app built for SSR
const App = require('./public/ssr/bundle')

// Create Svelte Easyroute renderer
const renderer = require('svelte-easyroute/lib/ssr')()

// Read template file
const template = fs.readFileSync(__dirname + '/public/index.html', 'utf8')

app.use('/build', express.static(__dirname + '/public/build'))
app.use('/global', express.static(__dirname + '/public/global'))

app.get('*', async (req, res) => {
    // Pass any props to component here
    const rendered = await renderer({
        component: App,
        props: {
            name: 'SSR'
        },
        // Don't forget to pass URL into renderer
        url: req.url
    })
    const ssrHtml = template
        .replace('{$ HTML $}', rendered.html)
        .replace('{$ STYLES $}', rendered.css.code)
        .replace('{$ HEAD $}', rendered.head)
    res.send(ssrHtml)
})

app.listen(3000, () => {
    console.log('Svelte SSR template is online!', 'http://localhost:3000')
})