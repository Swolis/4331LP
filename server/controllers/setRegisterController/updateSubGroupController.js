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
        const { model: subGroupModel, closeConnection2 } = getSubGroupModel(req.session.client);
        let findGroup = subGroupModel.findById(req.body.group.subgroups.group.groupID);
        if (findGroup == null) {
            res.status(404).json({ message: 'No group found.' });
            return;
        }
        findGroup.name = req.body.group.subgroups.group.name;
        await findGroup.save();
        findGroup.button = req.body.group.subgroups.group.buttons;
        await findGroup.save();
        closeConnection2();
        res.status(201).json({ message: ' Subgroup Updated', findGroup });
    }
    catch (error) {
        console.error(`Error updating subgroup: ${error.message}`);
        res.status(500).json({ message: `Internal server error` });
    }
};
