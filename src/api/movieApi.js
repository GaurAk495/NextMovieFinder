import { createSearchedData } from "@/dao/createData";
import apiClient from "./apiclient";

export const getMovie = async (pageNum, searchTerm, currentGenre, filter) => {

    const base = searchTerm ? '/search/movie' : '/discover/movie';
    const params = new URLSearchParams({
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: filter ? "false" : "true",
        include_video: 'false',
        page: pageNum,
    });

    if (searchTerm) {
        params.set('query', searchTerm);
    }

    if (currentGenre) {
        params.set('with_genres', currentGenre);
    }
    const data = await apiClient.get(`${base}?${params.toString()}`);
    const movieId = data?.data?.results[0]?.id || 0
    if (searchTerm && movieId) {
        await createSearchedData(movieId, searchTerm)
    }
    return data
};

export const getMovieById = (id) => apiClient.get(`/movie/${id}?append_to_response=credits,images,videos`);
export const getMovieImagesById = (id) => apiClient.get(`/movie/${id}/images`);

export const allGenre = () => {
    return apiClient.get('/genre/movie/list?language=en')
}

