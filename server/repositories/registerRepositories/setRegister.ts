import { Connection, Model } from "mongoose";
import groupSchema,{IGroup,getGroupModel} from "../../models/registerModels/groupsSchema";
import subGroupSchema,{ISubGroup,getSubGroupModel} from "../../models/registerModels/subGroupSchema";

export const createGroup: (clientDatabase: Connection, GroupData: any) => Promise<IGroup> = async (clientDatabase: Connection, GroupData: any) => {
    try {
        const {model:GroupModel,closeConnection}=getGroupModel(clientDatabase)

        const newGroup = new GroupModel(GroupData);

        // Save the new product
        await newGroup.save();

        closeConnection()

        return newGroup;
    } catch (error: any) {
        console.error('Error creating group:', error);
        throw new Error('Internal Server Error');
    }
};



export const createSubGroup:(clientDatabase: Connection, GroupData: any) => Promise<ISubGroup> = async (clientDatabase: Connection, GroupData: any) =>{
    try {
        const {model:SubGroupModel,closeConnection}=getSubGroupModel(clientDatabase)

        const newSubGroup = new SubGroupModel(GroupData);
        // Save the new product
        await newSubGroup.save();
        closeConnection()
        return newSubGroup;
    } catch (error: any) {
        console.error('Error creating sub:', error);
        throw new Error('Internal Server Error');
    }
} 