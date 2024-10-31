/* eslint-disable no-empty */
import variables from "../variables/variables";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(variables.appwriteURL)
            .setProject(variables.appwriteProjectID);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,image,status,user}){
        // 
        try {
            return await this.databases.createDocument(
                variables.appwriteDatabaseID,
                variables.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    user
                }
            )
        } catch (error) {
            console.log("Apperite::config::createPost",error);
        }
    }
    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(
                variables.appwriteDatabaseID,
                variables.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite::config::updatePost",error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                variables.appwriteDatabaseID,
                variables.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite::config::deletePost",error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                variables.appwriteDatabaseID,
                variables.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite::config::searchPost",error);
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
           return await this.databases.listDocuments(
                variables.appwriteDatabaseID,
                variables.appwriteCollectionID,
                queries,
           ) 
        } catch (error) {
            console.log("Appwrite::config::listPosts",error);
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                variables.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite::config::uploadFile",error);
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                variables.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite::config::deleteFile",error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            variables.appwriteBucketID,
            fileId
        )
    }
}

const service=new Service()

export default service