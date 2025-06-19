import apiClient from "./apiclient";

// Search or list popular people
export const getPeople = async (pageNum, searchTerm) => {
    const base = searchTerm ? "/search/person" : "/person/popular";
    const params = new URLSearchParams({ language: "en-US", page: pageNum });
    if (searchTerm) {
        params.set("query", searchTerm);
        params.set("include_adult", "false");
    }
    const data = await apiClient.get(`${base}?${params.toString()}`);
    return data;
};

// Get person details (biography, birth info, etc.)
export const getPersonById = (id) =>
    apiClient.get(`/person/${id}?language=en-US`);

// Get combined movie & TV credits
export const getPersonCredits = (id) =>
    apiClient.get(`/person/${id}/combined_credits?language=en-US`);

// Get all profile and tagged images
export const getPersonImages = (id) =>
    apiClient.get(`/person/${id}/images`);
