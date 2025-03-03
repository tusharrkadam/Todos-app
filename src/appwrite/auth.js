import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({ email, password }); // नोंदणी झाल्यानंतर थेट लॉगिन
            }
            return null;
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current'); // सर्व सत्रे नाहीशी करण्याऐवजी केवळ वर्तमान सत्र हटवा.
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
