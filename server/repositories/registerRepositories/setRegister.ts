import { Connection, Model } from "mongoose";
import groupSchema,{IGroup} from "../../models/registerModels/groupsSchema";

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
