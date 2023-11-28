import { getEmployeeModel } from '../../models/employee/employeeSchema';
export const EmployeeLoginController = async (req, res) => {
    // use employeeModel
    const { model: EmployeeModel, closeConnection } = getEmployeeModel(req.session.client);
    const query = req.body.query;
    closeConnection();
    console.log(`query: ${query}`);
    try {
        let searchResult;
        if (typeof (query) === 'string') {
            console.log('query is a string');
            searchResult = await EmployeeModel.findOne({
                pin: query
            });
        }
        else {
            throw new Error('search type invalid');
        }
        if (searchResult == undefined) {
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
