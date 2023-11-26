import { Connection, Model } from "mongoose";
import groupSchema,{IGroup} from "../../models/registerModels/groupsSchema";
import subGroupSchema,{ISubGroup} from "../../models/registerModels/subGroupSchema";

export const createGroup: (clientDatabase: Connection, GroupData: any) => Promise<IGroup> = async (clientDatabase: Connection, GroupData: any) => {
    try {
        const GroupModel: Model<IGroup> = clientDatabase.model<IGroup>('group', groupSchema);

        const newGroup = new GroupModel(GroupData);

        // Save the new product
        await newGroup.save();

   

        return newGroup;
    } catch (error: any) {
        console.error('Error creating order:', error);
        throw new Error('Internal Server Error');
    }
};



export const createSubGroup:(clientDatabase: Connection, GroupData: any) => Promise<ISubGroup> = async (clientDatabase: Connection, GroupData: any) =>{
    try {
        const SubGroupModel: Model<ISubGroup> = clientDatabase.model<ISubGroup>('subgroup', subGroupSchema);

        const newSubGroup = new SubGroupModel(GroupData);
        // Save the new product
        await newSubGroup.save();

   

        return newSubGroup;
    } catch (error: any) {
        console.error('Error creating sub:', error);
        throw new Error('Internal Server Error');
    }
} 