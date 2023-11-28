"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var makeAGroupController_1 = require("../../../controllers/setRegisterController/makeAGroupController");
var addSubGroupToGroupController_1 = require("../../../controllers/setRegisterController/addSubGroupToGroupController");
var updateGroupController_1 = require("../../../controllers/setRegisterController/updateGroupController");
var updateSubGroupController_1 = require("../../../controllers/setRegisterController/updateSubGroupController");
var groupRouter = (0, express_1.Router)();
groupRouter.post('/Create-Group', makeAGroupController_1.establishGroup);
groupRouter.post('/Create-SubGroup', addSubGroupToGroupController_1.establishSubGroup);
groupRouter.post('/Update-Group-Buttons', updateGroupController_1.updateGroup);
groupRouter.post('/Update-SubGroup-Buttons', updateSubGroupController_1.updateSubGroups);
exports.default = groupRouter;
