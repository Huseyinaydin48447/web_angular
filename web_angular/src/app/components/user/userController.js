const { getDataFromDBService, createUserDBService, updateUserDBService, removeUserDBService } = require("./userService");

const getDataControllerfn = async (req, res) => {
  try {
    const employee = await getDataFromDBService();
    res.send({ status: true, data: employee });
  } catch (error) {
    res.status(500).send({ status: false, message: "Error getting data", error });
  }
};

const createUserControllerFn = async (req, res) => {
  console.log("im here")
  try {
    await createUserDBService(req.body);
    res.send({ status: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Error creating user", error: error });
  }
};


const updateUserController = async (req, res) => {
  try {
    await updateUserDBService(req.params.id, req.body);
    res.send({ status: true, message: "User Updated" });
  } catch (error) {
    res.status(500).send({ status: false, message: "User Update Failed", error });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await removeUserDBService(req.params.id);
    res.send({ status: true, message: "User Deleted" });
  } catch (error) {
    res.status(500).send({ status: false, message: "User Deletion Failed", error });
  }
};

module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
};
