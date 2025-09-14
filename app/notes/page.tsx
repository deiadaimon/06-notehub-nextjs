import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function Notes() {
    const queryClient = new QueryClient();
    const page = 1;
    const search = "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", page, search],
        queryFn: () => fetchNotes(search, page),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}
