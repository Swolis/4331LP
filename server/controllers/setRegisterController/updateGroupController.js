import { getClientModel } from '../../models/ClientSchema';
import { getSubGroupModel } from '../../models/registerModels/subGroupSchema';
export const updateSubGroups = async (req, res) => {
    try {
        const { model: ClientModel, closeConnection } = getClientModel(req.session.client);
        const client = await ClientModel.findOne({});
        if (!client) {
            throw new Error('User not found');
        }
        await client.save();
        closeConnection();
        const { model: GroupModel, closeConnection2 } = getSubGroupModel(req.session.client);
        let findGroup = GroupModel.findById(req.body.group.groupID);
        if (findGroup == null) {
            res.status(404).json({ message: 'No group found.' });
            return;
        }
        findGroup.name = req.body.group.name;
        await findGroup.save();
        findGroup.button = req.body.group.button;
        await findGroup.save();
        closeConnection2();
        res.status(201).json({ message: ' Group Updated', findGroup });
    }
    catch (error) {
        console.error(`Error updating Group: ${error.message}`);
        res.status(500).json({ message: `Internal server error` });
    }
};
