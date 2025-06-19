import { databases, ID } from "@/api/appwriteConfig.js";
import { Query } from "appwrite";

export const readMovies = async () => {
    try {
        const response = await databases.listDocuments(
            'trending',
            'trendingMovies',
            [
                Query.orderDesc("searchedTimes")
            ]
        );

        return response.documents;
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};
export const readTV = async () => {
    try {
        const response = await databases.listDocuments(
            'trending',
            '68541ea3001e31eea5e3',
            [
                Query.orderDesc("searchedTimes")
            ]
        );

        return response.documents;
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};
