// Define the GET_USER_TODOS query in your 'yourQueries' file

import { gql } from '@apollo/client';

export const GET_USER_TODOS = gql`
  query GetUserTodos($userId: String!) {
    user(id: $userId) {
      todos {
        id
        description
        done
      }
    }
  }`
