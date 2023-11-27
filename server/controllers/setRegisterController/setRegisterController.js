import { getClientModel } from '../../models/ClientSchema';
import { createGroup } from '../../repositories/registerRepositories/setRegister';
export const setRegister = async (req, res) => {
    try {
        const { model: ClientModel, closeConnection } = getClientModel(req.session.client);
        const client = await ClientModel.findOne({});
        if (!client) {
            throw new Error('User not found');
        }
        await client.save();
        const subGroupSchema = {
            name: req.body.group.subgroups.group.name,
            button: req.body.group.subgroups.group.button
        };
        const groupSchema = {
            name: req.body.group.name,
            button: req.body.group.buttons,
            groups: subGroupSchema
        };
        const newGroup = await createGroup(req.app.locals.client, groupSchema);
        closeConnection();
        res.status(201).json({ message: ' Created new Order', newGroup });
    }
    catch (error) {
        console.error(`Error createing order: ${error.message}`);
        res.status(500).json({ message: `Internal server error` });
    }
};
