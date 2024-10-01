import { Navbar } from "../../component/Navbar";
import { Fragment, useReducer } from "react";
import { Sidebar } from "../../component/Sidebar";
import { notesReducer } from "../../reducers/notesReducer";

export const Home = () => {
  const initialState = {
    title: "",
    text: "",
    notes: [],
  };

  const [{ title, text, notes }, notesDispatch] = useReducer(
    notesReducer,
    initialState
  );
  const onTitleChange = (e) => {
    notesDispatch({
      type: "TITLE",
      payload: e.target.value,
    });
  };

  const onTextChange = (e) => {
    notesDispatch({
      type: "TEXT",
      payload: e.target.value,
    });
  };

  const onAddClick = () => {
    notesDispatch({
      type: "Add_Note",
    });
    notesDispatch({
      type: "CLEAR_INPUT",
    });
  };

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div>
          <div className="flex flex-col w-[300px] border-red-400 relative">
            <input
              value={title}
              onChange={onTitleChange}
              className="border"
              placeholder="Enter title"
            />
            <textarea
              value={text}
              onChange={onTextChange}
              className="border"
              placeholder="Enter text"
            />
            <button
              disabled={title.length === 0}
              onClick={onAddClick}
              className="absolute bottom-0 right-0"
            >
              <span class="material-symbols-outlined">Add</span>
            </button>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            {notes?.length > 0 &&
              notes.map(({ id, title, text }) => (
                <div className="w-[150px] border border-neutral-800 p-2 rounded-sm" key={id}>
                  <div className="flex justify-between">
                    <p>{title}</p>
                    <button>
                      <span class="material-symbols-outlined">bookmark</span>
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <p>{text}</p>
                    <button className="m1-auto">
                      <span class="material-symbols-outlined"></span>
                      archive
                    </button>
                    <button>
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
