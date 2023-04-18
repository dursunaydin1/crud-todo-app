import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/todo";
import Modal from "./components/modal";

function App() {
  // useState() tanımlamaları
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  // ekleme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText) {
      toast.warn("Formu Doldurun", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    // todo listesi
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };
  // silme işlemi
  const handleDelete = (deletedTodo) => {
    const filtred = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filtred);
    toast.error("Başarıyla kaldırıldı", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // yapıldı işlemi
  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);
    const changedTodo = { ...todo, isDone: !todo.isDone };
    const newTodos = [...todos];
    newTodos.splice(index, 1, changedTodo);
    setTodos(newTodos);
  };

  // düzenleme işlemi
  const handleSaveEdit = () => {
    if (!editingTodo.title) {
      toast.success("Boş bırakılamaz", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let index = todos.findIndex((item) => item.id === editingTodo.id);
    const cloneTodos = [...todos];
    cloneTodos.splice(index, 1, editingTodo);
    setTodos(cloneTodos);
    setShowModal(false);

    toast.success("Başarıyla güncellendi", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="bg-dark">CRUD</h1>
      <div className="container border p-4 mt-4">
        {/* form submit olayı ile form içindeki ekle butonu aynı işlemi gerçekleştiriyor  */}
        <form onSubmit={handleSubmit} className="d-flex gap-3">
          {/* girilen değerleri alarak useState() deki diziye aktarma */}
          <input
            className="form-control"
            type="text"
            placeholder="yapılacakları giriniz"
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          <button className="btn btn-warning btn-lg">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {todos.length === 0 && (
            <h4 className="text-center">Yapılacak herhangi bir işiniz yok.</h4>
          )}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditingTodo={setEditingTodo}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowModal={setShowModal}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
