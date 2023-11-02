import User, { IUser } from '../models/ClientSchema';

export const createUser: (userData: any) => Promise<IUser> = async (userData) => {
    const newUser = new User(userData);
    return newUser.save();
}