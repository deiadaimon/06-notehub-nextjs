"use client";

import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import Loading from "../loading";
import Error from "./error";

export default function NotesClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch] = useDebounce(search, 1000);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => fetchNotes(
            debouncedSearch,
            page),
        placeholderData: (prev) => prev,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {data?.totalPages && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                    />
                )}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
            {isLoading && <Loading />}
            {isError && <Error error={error} />}      
            
            {data && !isLoading && data.notes.length > 0 && <NoteList notes={data.notes} />}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onCancel={closeModal} />
                </Modal>
            )}
        </div>
    );
}
