import { getEmployeeModel } from '../../models/employee/employeeSchema';
export const findEmployeeController = async (req, res) => {
    console.log('entering employee search controller');
    //use employee model
    const { model: EmployeeModel, closeConnection } = getEmployeeModel(req.session.client);
    const query = req.body.query;
    console.log(`query: ${query}`);
    try {
        let searchResult;
        if (typeof (query) === 'string') {
            console.log('query is a string');
            searchResult = await EmployeeModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { employeeId: { $regex: query, $options: 'i' } }
                ],
            });
        }
        else {
            throw new Error('search type invalid');
        }
        if (searchResult.length === 0) {
            console.log('no employee found');
            closeConnection();
            res.status(404).json({ message: 'employee not found' });
            return;
        }
        closeConnection();
        res.status(201).json(searchResult);
    }
    catch (error) {
        console.log('error: ', error);
        closeConnection();
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
};
