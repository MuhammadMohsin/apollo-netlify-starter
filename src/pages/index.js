import React, { useRef } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_ALL_TODOS = gql`
{
  todos {
    id
    description
  }
}
`;

const ADD_TODO = gql`
  mutation addTodo($description: String!){
    addTodo(description: $description){
      id
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const descField = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      variables: {
        description: descField.current.value
      },
      refetchQueries: () => [{ query: GET_ALL_TODOS }]
    })
  }

  if (loading)
    return <h3>Loading..</h3>

  if (error)
    return <h3>Error</h3>

  return (
    <div>
      <h2>Add Todo</h2>
      <form onClick={handleSubmit}>
        <input type="text"
          placeholder="Enter Todo"
          ref={descField}
          required={true} />
        <input type="submit" value="Add" />
      </form>

      <h2>My Todos</h2>
      {data && data.todos && (
        <div>{JSON.stringify(data.todos)}</div>
      )}
    </div>
  );
}