const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }
  type Todo {
    id: ID!
    description: String!
  }
`

const todo_list = [
  { id: 1, description: 'Go for exercise' },
  { id: 2, description: 'Meet with Jack' },
  { id: 3, description: 'Grocery shopping' }
]

const resolvers = {
  Query: {
    todos: (root, args, context) => {
      return todo_list
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
