const cors = require('cors')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

const PORT = 4000

// - - - - - - - - - - - -

app.use(cors())

// - - - - - - - - - - - -

app.get('/content/version', (req, res) => {
  fs.readFile('content.json', (err, data) => {
    if (err) throw err
    const content = JSON.parse(data)
    return res.send({ version: content[0].Content })
  })
})

app.get('/content', (req, res) => {
  fs.readFile('content.json', (err, data) => {
    if (err) throw err
    const content = JSON.parse(data)
    const contentFormatted = content
      .map(row => {
        // map properties from row to new properties
        const updatedRow = {
          showFor: row['Show For'],
          id: row.ID,
          parentID: row['Parent ID'],
          dataID: row['Data ID'],
          contentArea: row['Content Area'],
          page: parseInt(row.Page, 10),
          contentOrderOnPage: parseInt(row['Content Order on Page'], 10),
          contentType: row['Content Type'],
          contentKey: row['Content Key'],
          content: row.Content,
          required: row.Required ? row.Required.toLowerCase() === 'yes' : false
        }

        // return the updated row
        return updatedRow
      })
      .reduce((acc, row) => {
        const { contentKey, contentType, contentProps = {}, id } = row
        // store previous row from acc
        const previousRow = acc[acc.length - 1]
        const propertyOnlyRow = !id || !contentType

        // if row is property only and there is a previous row
        if (propertyOnlyRow && previousRow) {
          // default previous content props to object
          const previousContentProps = previousRow.contentProps || {}

          // MUTATE previous row from acc to include content props
          acc[acc.length - 1] = {
            ...previousRow,
            contentProps: {
              ...previousContentProps,
              [contentKey]: row.content
            }
          }
          return acc
        }

        // if is a content key to add to content props
        if (contentKey) {
          // update row and return updated acc
          return acc.concat({
            ...row,
            contentProps: {
              ...contentProps,
              [contentKey]: row.content
            }
          })
        }

        // default to add original row to updated acc
        return acc.concat(row)
      }, [])
      .reduce((acc, row) => {
        const { parentID } = row
        if (parentID) {
          const foundParentIndex = acc.findIndex(r => r.id === parentID)
          if (foundParentIndex) {
            const foundParent = acc[foundParentIndex]
            // MUTATE found parent
            acc[foundParentIndex] = {
              ...foundParent,
              nested: foundParent.nested ? foundParent.nested.concat(row) : [row]
            }
          }
          return acc
        }

        // default to add original row to updated acc
        return acc.concat(row)
      }, [])
    return res.send(contentFormatted)
  })
})

// - - - - - - - - - - - -

app.use(express.static(path.join(__dirname, '../public')))

// - - - - - - - - - - - -

console.log(`Starting Stmikes BEFORE local server on port ${PORT}...`)

const server = app.listen(PORT, () => {
  const { address: host, port } = server.address() || {}
  const date = new Date().toISOString()

  console.log(`Success! Listening at host (${host}), port (${port}), date (${date})`)
})

console.error('Generate console.error on purpose to complete Jenkins deployment')
