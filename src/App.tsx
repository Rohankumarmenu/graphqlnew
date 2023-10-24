// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { gql } from '@apollo/client';
// import { GET_USER_TODOS } from './yourQueries';


// const ADD_TODO = gql`
//   mutation addTodo($description: String!) {
//     insert_todos(objects: {description: $description}) {
//       returning {

//         id
//         description
//         done
//       }
//     }
//   }
// `;

// const TOGGLE_TODOS = gql`
//   mutation toggleTodo($id: uuid!, $done: Boolean!) {
//     update_todos(where: {id: {_eq: $id}}, _set: {done: $done}) {
//       returning {

//         id
//         description
//         done
//       }
//     }
//   }
// `;

// const DELETE_TODO = gql`
//   mutation DeleteTodo($id: uuid!) {
//     delete_todos(where: {id: {_eq: $id}}) {
//       returning {

//         id
//         description
//         done
//       }
//     }
//   }
// `;

// interface Todo {
//   id: string;
//   description:String;
//   done: boolean;
//   // text: string;
// }

// function App() {
//   const [todoText, setTodoText] = useState<string>('');
//   const { data, loading, error } = useQuery<{ user: { todos: Todo[] } }>(GET_USER_TODOS, {
//     variables: { userId: 'someUser' }, // Replace 'someUser' with the actual user ID
//   });
//   const [toggleTodo] = useMutation(TOGGLE_TODOS);
//   const [addTodo] = useMutation(ADD_TODO, {
//     onCompleted: () => setTodoText(''),
//   });
//   const [deleteTodo] = useMutation(DELETE_TODO);

//   async function handleToggleTodo({ id, done }: Todo) {
//     await toggleTodo({
//       variables: { id, done: !done },
//     });
//   }

//   async function handleAddTodo(event: React.FormEvent) {
//     event.preventDefault();
//     if (!todoText.trim()) return;

//     await addTodo({
//       variables: { description: todoText },
//       refetchQueries: [
//         { query: GET_USER_TODOS, variables: { userId: 'someUser' } }, // Replace 'someUser' with the actual user ID
//       ],
//     });
//   }

//   async function handleDeleteTodo({ id }: Todo) {
//     const isConfirmed = window.confirm('Do you want to delete this todo');
//     if (isConfirmed) {
//       await deleteTodo({
//         variables: { id },
//         update: (cache) => {
//           const prevData = cache.readQuery<{ user: { todos: Todo[] } }>({
//             query: GET_USER_TODOS,
//             variables: { userId: 'someUser' }, // Replace 'someUser' with the actual user ID
//           });

//           const newTodos = prevData?.user?.todos.filter((todo) => todo.id !== id) || [];
//           cache.writeQuery({
//             query: GET_USER_TODOS,
//             variables: { userId: 'someUser' }, // Replace 'someUser' with the actual user ID
//             data: { user: { todos: newTodos } },
//           });
//         },
//       });
//     }
//   }


//   if (loading) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           marginTop: 50,
//         }}
//       >
//         {/* <CircularProgress/> */}
//       </div>
//     );
//   }
//   if (error) {
//     console.log(error);
//     return <div>error fetching todoss</div>;

//   }

//   return (
//     <>
//       <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
//         <h1 className="f2-l">
//           GraphQL Checklist
//           <span role="img" aria-label="Checkmark">
//             ✅
//           </span>
//         </h1>
//         <form onSubmit={handleAddTodo} className="mb3">
//           <input
//             className="pa2 f4 b--dashed"
//             type="text"
//             placeholder="Add A Todo"
//             onChange={(event) => setTodoText(event.target.value)}
//             value={todoText}
//           />
//           <button className="pa2 f4 bg-green" type="submit">
//             Create
//           </button>
//         </form>
//         <div
//           className="flex items-center justify-center flex-column"
//           style={{ overflow: 'scroll', width: '80vw' }}
//         >
//           {data?.user?.todos.map((todo) => (
//             <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
//               <span className={`pointer list pa1 f3 ${todo.done && 'strike'}`}>
//                 {todo.description}
//               </span>
//               <button onClick={() => handleDeleteTodo(todo)} className="bg-transparent bn f4">
//                 <span className="red">&times;</span>
//               </button>
//             </p>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;




// type Mutation{ 
//   signupUserDummy(userNew:UserInput!):User
//  }

//  input UserInput{
//   name:String!,
//   email:String!,
//   password:String!
//  }


// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { gql } from '@apollo/client';
// import { GET_USER_TODOS } from './yourQueries';

// const ADD_TODO = gql`
//   mutation addTodo($text: String!) {
//     insert_todos(objects: { text: $text }) {
//       returning {
//         done
//         id
//         text
//       }
//     }
//   }
// `;

// const TOGGLE_TODOS = gql`
//   mutation toggleTodo($id: uuid!, $done: Boolean!) {
//     update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
//       returning {
//         done
//         id
//         text
//       }
//     }
//   }
// `;

// const DELETE_TODO = gql`
//   mutation deleteTodo($id: uuid!) {
//     delete_todos(where: { id: { _eq: $id } }) {
//       returning {
//         done
//         id
//         text
//       }
//     }
//   }
// `;

// interface Todo {
//   id: string;
//   done: boolean;
//   text: string;
// }

// function App() {
//   const [todoText, setTodoText] = useState<string>('');
//   const { data, loading, error } = useQuery<{ user: { todos: Todo[] } }>(GET_USER_TODOS, {
//     variables: { userId: 'Hello World' }, // Replace 'someUser' with the actual user ID
//   });
//   const [toggleTodo] = useMutation(TOGGLE_TODOS);
//   const [addTodo] = useMutation<{ insert_todos: Todo[] }>(ADD_TODO, {
//     onCompleted: () => setTodoText(''),
//   });
//   const [deleteTodo] = useMutation<{ delete_todos: Todo[] }>(DELETE_TODO);

//   async function handleToggleTodo({ id, done }: Todo) {
//     await toggleTodo({
//       variables: { id, done: !done },
//     });
//   }
//   async function handleAddTodo(event: React.FormEvent) {
//     event.preventDefault();
//     if (!todoText.trim()) return;
  
//     try {
//       console.log('Adding todo...');
//       await addTodo({
//         variables: { text: todoText },
//         refetchQueries: [
//           { query: GET_USER_TODOS, variables: { userId: 'Hello World' } },
//         ],
//       });
//       setTodoText('');
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     }
//   }

//   async function handleDeleteTodo({ id }: Todo) {
//     const isConfirmed = window.confirm('Do you want to delete this todo');
//     if (isConfirmed) {
//       await deleteTodo({
//         variables: { id },
//         update: (cache) => {
//           const prevData = cache.readQuery<{ user: { todos: Todo[] } }>({
//             query: GET_USER_TODOS,
//             variables: { userId: 'Hello World' }, // Replace 'someUser' with the actual user ID
//           });

//           const newTodos = prevData?.user?.todos.filter((todo) => todo.id !== id) || [];
//           cache.writeQuery({
//             query: GET_USER_TODOS,
//             variables: { userId: 'Hello World' }, // Replace 'someUser' with the actual user ID
//             data: { user: { todos: newTodos } },
//           });
//         },
//       });
//     }
//   }

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           marginTop: 50,
//         }}
//       >
//         {/* Loading... */}
//       </div>
//     );
//   }
//   if (error) return <div>Error fetching todos: {error.message}</div>;

//   return (
//     <>
//       <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
//         <h1 className="f2-l">
//           GraphQL Checklist
//           <span role="img" aria-label="Checkmark">
//             ✅
//           </span>
//         </h1>
//         <form onSubmit={handleAddTodo} className="mb3">
//           <input
//             className="pa2 f4 b--dashed"
//             type="text"
//             placeholder="Add A Todo"
//             onChange={(event) => setTodoText(event.target.value)}
//             value={todoText}
//           />
//           <button className="pa2 f4 bg-green" type="submit">
//             Create
//           </button>
//         </form>
//         <div
//           className="flex items-center justify-center flex-column"
//           style={{ overflow: 'scroll', width: '80vw' }}
//         >
//           {data?.user.todos.map((todo) => (
//             <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
//               <span className={`pointer list pa1 f3 ${todo.done && 'strike'}`}>
//                 {todo.text}
//               </span>
//               <button onClick={() => handleDeleteTodo(todo)} className="bg-transparent bn f4">
//                 <span className="red">&times;</span>
//               </button>
//             </p>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { GET_USER_TODOS } from './yourQueries';

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
          marginTop: 50,
        }}
      >
        Loading...
      </div>
    );
  }
  if (error) return <div>Error fetching todos: {error.message}</div>;

  return (
    <>
      <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
        <h1 className="f2-l">
          GraphQL Checklist
          <span role="img" aria-label="Checkmark">
            ✅
          </span>
        </h1>
        <form onSubmit={handleAddTodo} className="mb3">
          <input
            className="pa2 f4 b--dashed"
            type="text"
            placeholder="Add A Todo"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
          />
          <button className="pa2 f4 bg-green" type="submit">
            Create
          </button>
        </form>
        <div
          className="flex items-center justify-center flex-column"
          style={{ overflow: 'scroll', width: '80vw' }}
        >
          {data?.user.todos.map((todo) => (
            <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
              <span className={`pointer list pa1 f3 ${todo.done && 'strike'}`}>
                {todo.description}
              </span>
              <button onClick={() => handleDeleteTodo(todo)} className="bg-transparent bn f4">
                <span className="red">&times;</span>
              </button>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
