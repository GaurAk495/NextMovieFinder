import { createTVSearchedData } from "@/dao/createData";
import apiClient from "./apiclient";

// Get TV Shows List (Discover or Search)
export const getTV = async (pageNum, searchTerm, currentGenre, filter) => {
    const base = searchTerm ? '/search/tv' : '/discover/tv';
    const params = new URLSearchParams({
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: filter ? "false" : "true",
        page: pageNum,
    });

    if (searchTerm) {
        params.set('query', searchTerm);
    }

    if (currentGenre) {
        params.set('with_genres', currentGenre);
    }

    const data = await apiClient.get(`${base}?${params.toString()}`);
    const tvId = data?.data?.results[0]?.id || 0
    if (searchTerm && tvId) {
        await createTVSearchedData(tvId, searchTerm)
    }
    return data;
};

// Get Detailed TV Show Info (with credits, images, videos)
export const getTVById = (id) =>
    apiClient.get(`/tv/${id}?append_to_response=credits,images,videos`);

// Get Only TV Show Images
export const getTVImagesById = (id) =>
    apiClient.get(`/tv/${id}/images`);

// Get All TV Genres
export const allTVGenre = () => {
    return apiClient.get('/genre/tv/list?language=en');
};
