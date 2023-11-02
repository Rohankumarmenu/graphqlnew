
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { GET_USER_TODOS } from './yourQueries';
import '../src/styles.css'

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    insert_todos(objects: { description: $text, done: false }) {
      returning {
        id
        description
        done
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      description
      done
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        id
        description
        done
      }
    }
  }
`;

const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      description
      done
    }
  }
`;

interface Todo {
  id: string;
  done: boolean;
  description: string;
}

function App() {
  const [todoText, setTodoText] = useState<string>('');
  const { data, loading, error } = useQuery<{ user: { todos: Todo[] } }>(GET_USER_TODOS, {
    variables: { userId: 'Hello World' }, // Replace 'Hello World' with the actual user ID
  });
  const [addTodo] = useMutation<{ insert_todos: Todo[] }>(ADD_TODO, {
    onCompleted: () => setTodoText(''),
  });
  const [updateTodo] = useMutation<{ updateTodo: Todo }>(UPDATE_TODO);
  const [deleteTodo] = useMutation<{ delete_todos: Todo[] }>(DELETE_TODO);

  async function handleToggleTodo({ id, done, description }: Todo) {
    await updateTodo({
      variables: {
        input: {
          id,
          done: !done,
          description,
        },
      },
      refetchQueries: [
        { query: GET_USER_TODOS, variables: { userId: 'Hello World' } }, // Replace 'Hello World' with the actual user ID
      ],
    });
  }

  async function handleAddTodo(event: React.FormEvent) {
    event.preventDefault();
    if (!todoText.trim()) return;

    try {
      await addTodo({
        variables: { text: todoText },
        refetchQueries: [
          { query: GET_USER_TODOS, variables: { userId: 'Hello World' } }, // Replace 'Hello World' with the actual user ID
        ],
      });
      setTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function handleDeleteTodo({ id }: Todo) {
    const isConfirmed = window.confirm('Do you want to delete this todo');
    if (isConfirmed) {
      await deleteTodo({
        variables: { id },
        update: (cache) => {
          const prevData = cache.readQuery<{ user: { todos: Todo[] } }>({
            query: GET_USER_TODOS,
            variables: { userId: 'Hello World' }, // Replace 'Hello World' with the actual user ID
          });

          const newTodos = prevData?.user?.todos.filter((todo) => todo.id !== id) || [];
          cache.writeQuery({
            query: GET_USER_TODOS,
            variables: { userId: 'Hello World' }, // Replace 'Hello World' with the actual user ID
            data: { user: { todos: newTodos } },
          });
        },
      });
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        Loading...
      </div>
    );
  }
  if (error) return <div>Error fetching todos: {error.message}</div>;

  return (
    <> <div className="flex flex-col items-center justify-center mt-20 ">
    <div className="code bg-primary text-black p-3 ">
      <h1 className="text-2xl">
        TO DO
        <span role="img" aria-label="Checkmark" className="ml-2">
          ✅
        </span>
      </h1>
      <br className='mt-0'></br>
      <form onSubmit={handleAddTodo} className="mb-6 ">
        <input
          className="p-2 text-black border-b border-dashed w-64 outline-none rounded-lg"
          type="text"
          placeholder="Add A Todo"
          onChange={(event) => setTodoText(event.target.value)}
          value={todoText}
        />
        <button className="p-2 bg-accent ml-2 rounded-lg" type="submit">
          Create
        </button>
      </form>
      <div
        className="flex flex-col items-center justify-center"
        style={{ overflow: 'scroll', width: '80vw', maxHeight: '40vh' }}
      >
        {data?.user.todos.map((todo) => (
          <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
            <span className={`cursor-pointer list pa1 text-lg ${todo.done && 'line-through'}`}>
              {todo.description}
            </span>
            <button onClick={() => handleDeleteTodo(todo)} className="bg-third border-third text-xl ml-2 text-secondary">
              &times;
            </button>
          </p>
        ))}
      </div>
    </div>
  </div>
  </>
  );
}

export default App;