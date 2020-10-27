import React from "react"
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// This query is executed at run time by Apollo.
const GET_ALL_TODOS = gql`
{
  todos {
    id
  }
}
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TODOS);

  if (loading)
    return <h3>Loading..</h3>

  if (error)
    return <h3>Error</h3>

  return (
    <div>
      <h2>My Todos</h2>
      {data && data.todos && (
        <div>{JSON.stringify(data.todos)}</div>
      )}
    </div>
  );
}