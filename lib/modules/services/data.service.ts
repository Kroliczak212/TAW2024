import {IData, Query} from "../models/data.model";
import PostModel from '../schemas/data.schema';

class DataService {
   public async createPost(postParams: IData) {
       try {
           const dataModel = new PostModel(postParams);
           await dataModel.save();
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }
   }

   public async query(query: Query<number | string | boolean>) {
       try {
           const result = await PostModel.find(query, { __v: 0, _id: 0 });
           return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }


    public async getAll(): Promise<IData[]> {
        try {
            const posts = await PostModel.find({}, { __v: 0 }); // Wykluczamy pole __v
            return posts;
        } catch (error) {
            console.error("Error fetching all posts:", error);
            throw new Error("Error fetching all posts");
        }
    }
 
    public async deleteData(query: Query<number | string | boolean>) {
        try {
            await PostModel.deleteMany(query);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }
    // Method to get a post by its ID
   public async getById(id: string) {
    try {
        const post = await PostModel.findById(id, { __v: 0, _id: 0 }); // Excluding _id and __v
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, error);
        throw new Error(`Error fetching post with ID ${id}`);
    }
}

// Method to delete a post by its ID
public async deleteById(id: string) {
    try {
        const result = await PostModel.findByIdAndDelete(id); // Deletes the post by ID
        if (!result) {
            throw new Error('Post not found');
        }
        return result;
    } catch (error) {
        console.error(`Error deleting post with ID ${id}:`, error);
        throw new Error(`Error deleting post with ID ${id}`);
    }
}

// Method to delete all posts from the collection
public async deleteAllPosts() {
    try {
        const result = await PostModel.deleteMany({}); // Deletes all posts
        return result;
    } catch (error) {
        console.error('Error deleting all posts:', error);
        throw new Error('Error deleting all posts');
    }
}

 
 }
 
 export default DataService;
 
