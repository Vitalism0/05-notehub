import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoResults from "../NoResults/NoResults";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, page, perPage],
    queryFn: () => fetchNotes(debouncedQuery, page, perPage),
    placeholderData: keepPreviousData,
  });
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onChange={handleSearchChange} />
        {isSuccess && data?.totalPages > 1 ? (
          <Pagination
            page={page}
            totalPages={data?.totalPages}
            onPageChange={setPage}
          />
        ) : null}

        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <NoteForm onClose={() => setIsOpen(false)} />
          </Modal>
        )}
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && (
        <>
          {data.notes.length ? <NoteList notes={data.notes} /> : <NoResults />}
        </>
      )}
    </div>
  );
}
