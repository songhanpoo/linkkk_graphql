const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')
const keys = require("./config/keys");


const app = express()

app.use('/graphql', graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))

const options = {useNewUrlParser: true, useUnifiedTopology: true}
console.log(keys.mongoURI);
mongoose.connect(keys.mongoURI, options)
        .then(() => app.listen(keys.portListen, console.log('Srv is running')))
        .catch(error => { throw error })
