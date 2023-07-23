const express = require("express");
const router = express.Router();
const userController = require('../app/components/user/userController');

router.route("/user/getAll").get(userController.getDataControllerfn);
router.route("/user/add").post(userController.createUserControllerFn);
router.route("/user/update/:id").patch(userController.updateUserController);
router.route("/user/delete/:id").delete(userController.deleteUserController);

module.exports = router;
