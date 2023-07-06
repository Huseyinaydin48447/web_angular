const userService = require("./userService");

const getDataControllerfn = async (req, res) => {
  const employee = await userService.getDataFromDBService();
  res.send({ status: true, data: employee });
};

const createUserControllerFn = async (req, res) => {
  const status = await userService.createUserDBService(req.body);
  if (status) {
    res.send({ status: true, message: "User created successfully" });
  } else {
    res.send({ status: false, message: "Error creating user" });
  }
};

const updateUserController = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  var result = await userService.updateUserDBService(req.params.id, req.body);
  if (result) {
    res.send({ status: true, message: "User Updated" });
  } else {
    res.send({ status: false, message: "User Update Failed" });
  }
};

const deleteUserController = async (req, res) => {
  console.log(req.params.id);
  var result = await userService.removeUserDBService(req.params.id);
  if (result) {
    res.send({ status: true, message: "User Deleted" });
  } else {
    res.send({ status: false, message: "User Deletion Failed" });
  }
};

module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
};
