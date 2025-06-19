import { databases, ID } from "@/api/appwriteConfig.js";
import { Query } from 'appwrite';

export const createSearchedData = async (movieId, searchTerm) => {
    try {
        const { documents } = await databases.listDocuments(
            'trending',
            'trendingMovies',
            [Query.equal('movieId', movieId)]
        );

        if (documents.length > 0) {
            const doc = documents[0];
            await databases.updateDocument(
                'trending',
                'trendingMovies',
                doc.$id,
                { searchedTimes: doc.searchedTimes + 1 }
            );
        } else {
            await databases.createDocument(
                'trending',
                'trendingMovies',
                ID.unique(),
                {
                    movieId,
                    searchTerm,
                    searchedTimes: 1,
                }
            );
        }
    } catch (err) {
        console.error("Error saving search data:", err);
    }
};

export const createTVSearchedData = async (tvId, searchTerm) => {
    try {
        const { documents } = await databases.listDocuments(
            'trending',
            '68541ea3001e31eea5e3',
            [Query.equal('tvId', tvId)]
        );

        if (documents.length > 0) {
            const doc = documents[0];
            await databases.updateDocument(
                'trending',
                '68541ea3001e31eea5e3',
                doc.$id,
                { searchedTimes: doc.searchedTimes + 1 }
            );
        } else {
            await databases.createDocument(
                'trending',
                '68541ea3001e31eea5e3',
                ID.unique(),
                {
                    tvId,
                    searchTerm,
                    searchedTimes: 1,
                }
            );
        }
    } catch (err) {
        console.error("Error saving search data:", err);
    }
};
