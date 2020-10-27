const { ApolloServer, gql } = require('apollo-server-lambda');

var todo_list = [
  { id: 1, description: 'Go for exercise' },
  { id: 2, description: 'Meet with Jack' },
  { id: 3, description: 'Grocery shopping' }
]

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }
  type Todo {
    id: ID!
    description: String!
  }
  type Mutation {
    addTodo(description: String!): Todo
  }
`
const resolvers = {
  Query: {
    todos: (root, args, context) => {
      return todo_list
    },
  },
  Mutation: {
    addTodo: (_, { description }) => {
      const newTodo = { id: todo_list.length + 1, description }
      todo_list.push(newTodo);
      console.log(JSON.stringify(todo_list));
      return newTodo;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
