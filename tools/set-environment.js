#!/bin/node

const fs = require('fs')

// Obtain the environment string passed to the node script
const environment = process.argv[2]

// variables for clarity
const source = `./envs/${environment}.js`
const destination = 'env.js'

// Copy and rename the js inside the env.js file
fs.copyFile(source, destination, err => {
  if (err) throw err
  console.log(`${source} was copied to ${destination}`)
})
