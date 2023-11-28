import { Router } from 'express';

import { establishGroup } from '../../../controllers/setRegisterController/makeAGroupController';
import { establishSubGroup } from '../../../controllers/setRegisterController/addSubGroupToGroupController';
import { updateGroup } from '../../../controllers/setRegisterController/updateGroupController';
import { updateSubGroups } from '../../../controllers/setRegisterController/updateSubGroupController';

const groupRouter = Router();

groupRouter.post('/Create-Group', establishGroup);
groupRouter.post('/Create-SubGroup', establishSubGroup);

groupRouter.post('/Update-Group-Buttons', updateGroup);
groupRouter.post('/Update-SubGroup-Buttons', updateSubGroups);

export default groupRouter;