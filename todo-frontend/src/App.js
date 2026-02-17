// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// const API = "http://localhost:8080/api/todos";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("LOW");
//   const [filter, setFilter] = useState("all");
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});


//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async (completed) => {
//     let url = API;
//     if (completed !== undefined) {
//       url = `${API}?completed=${completed}`;
//     }
//     const response = await axios.get(url);
//     setTodos(response.data);
//   };

//   const refreshWithFilter = () => {
//     if (filter === "all") fetchTodos();
//     if (filter === "active") fetchTodos(false);
//     if (filter === "completed") fetchTodos(true);
//   };

//   const addTodo = async () => {
//     if (!title) return alert("Title required");

//     await axios.post(API, {
//       title,
//       description,
//       completed: false,
//       dueDate,
//       priority
//     });

//     setTitle("");
//     setDescription("");
//     setDueDate("");
//     setPriority("LOW");
//     refreshWithFilter();
//   };

//   const toggleComplete = async (todo) => {
//     await axios.put(`${API}/${todo.id}`, {
//       ...todo,
//       completed: !todo.completed,
//     });
//     refreshWithFilter();
//   };

//   const deleteTodo = async (id) => {
//     await axios.delete(`${API}/${id}`);
//     refreshWithFilter();
//   };

//   return (
    
//     <div className="container">
//       <h1 className="heading">Todo Task</h1>
//       <div className="card">
       

//         {/* FILTER */}
//         {/* <div className="filter-container">
//           <button onClick={() => { setFilter("all"); fetchTodos(); }}>All</button>
//           <button onClick={() => { setFilter("active"); fetchTodos(false); }}>Active</button>
//           <button onClick={() => { setFilter("completed"); fetchTodos(true); }}>Completed</button>
//         </div> */}
//         <div className="filter-container">
//   <button
//     className={filter === "all" ? "active" : ""}
//     onClick={() => {
//       setFilter("all");
//       fetchTodos();
//     }}
//   >
//     All
//   </button>

//   <button
//     className={filter === "active" ? "active" : ""}
//     onClick={() => {
//       setFilter("active");
//       fetchTodos(false);
//     }}
//   >
//     Active
//   </button>

//   <button
//     className={filter === "completed" ? "active" : ""}
//     onClick={() => {
//       setFilter("completed");
//       fetchTodos(true);
//     }}
//   >
//     Completed
//   </button>
// </div>
//         {/* INPUT */}
//         <div className="input-container">
//           <input
//             className="input"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             className="input"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <input
//             type="date"
//             className="input"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />

//           <select
//             className="input"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//           >
//             <option value="LOW">Low</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="HIGH">High</option>
//           </select>

//           <button className="addButton" onClick={addTodo}>
//             Add
//           </button>
//         </div>

//         {/* LIST */}
//         <ul className="list">

//           {todos.map((todo) => (
//             <li key={todo.id} className={`todoItem ${todo.priority.toLowerCase()}`}>
//               <div onClick={() => toggleComplete(todo)} style={{ cursor: "pointer" }}>
//                 <div
//                   className="title"
//                   style={{
//                     textDecoration: todo.completed ? "line-through" : "none",
//                   }}
//                 >
//                   {todo.title}
//                 </div>
//                 <div className="description">{todo.description}</div>
//                 <div className="meta">
//                   Due: {todo.dueDate || "N/A"} | Priority: {todo.priority}
//                 </div>
//               </div>

//               <button
//                 className="delete-button"
//                 onClick={() => deleteTodo(todo.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;





import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (completed) => {
    let url = API;
    if (completed !== undefined) {
      url = `${API}?completed=${completed}`;
    }
    const response = await axios.get(url);
    setTodos(response.data);
  };

  const refreshWithFilter = () => {
    if (filter === "all") fetchTodos();
    if (filter === "active") fetchTodos(false);
    if (filter === "completed") fetchTodos(true);
  };

  const addTodo = async () => {
    if (!title) return alert("Title required");

    await axios.post(API, {
      title,
      description,
      completed: false,
      dueDate,
      priority,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("LOW");
    refreshWithFilter();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    refreshWithFilter();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    refreshWithFilter();
  };

  // ✅ START EDIT
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate || "",
      priority: todo.priority,
      completed: todo.completed,
    });
  };

  // ✅ SAVE EDIT
  const saveEdit = async (id) => {
    await axios.put(`${API}/${id}`, editData);
    setEditingId(null);
    refreshWithFilter();
  };

  return (
    <div className="container">
      <h1 className="heading">Todo Task</h1>

      <div className="card">

        {/* FILTER */}
        <div className="filter-container">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => {
              setFilter("all");
              fetchTodos();
            }}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => {
              setFilter("active");
              fetchTodos(false);
            }}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => {
              setFilter("completed");
              fetchTodos(true);
            }}
          >
            Completed
          </button>
        </div>

        {/* ADD INPUT */}
        <div className="input-container">
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button className="addButton" onClick={addTodo}>
            Add
          </button>
        </div>

        {/* LIST */}
        <ul className="list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todoItem ${todo.priority.toLowerCase()}`}
            >
              {editingId === todo.id ? (
                <>
                  <div className="edit-section">
                    <input
                      className="input"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />

                    <input
                      className="input"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      className="input"
                      value={editData.dueDate}
                      onChange={(e) =>
                        setEditData({ ...editData, dueDate: e.target.value })
                      }
                    />

                    <select
                      className="input"
                      value={editData.priority}
                      onChange={(e) =>
                        setEditData({ ...editData, priority: e.target.value })
                      }
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>

                    <button
                      className="save-button"
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>

                    <button
                      className="cancel-button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => toggleComplete(todo)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="title"
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.title}
                    </div>

                    <div className="description">
                      {todo.description}
                    </div>

                    <div className="meta">
                      Due: {todo.dueDate || "N/A"} | Priority:{" "}
                      {todo.priority}
                    </div>
                  </div>

                  <div>
                    <button
                      className="edit-button"
                      onClick={() => startEdit(todo)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

