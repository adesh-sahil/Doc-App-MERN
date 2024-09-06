const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    
    if (status === "approved") {
      // If approved, update the doctor status
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      
      // Send notification to user
      const notification = user.notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has Been ${status}`,
        onClickPath: "/notification",
      });

      // Mark the user as a doctor
      user.isDoctor = true;
      await user.save();

      res.status(201).send({
        success: true,
        message: "Doctor Account Approved Successfully",
        data: doctor,
      });

    } else if (status === "rejected") {
      // If rejected, remove doctor from the doctor collection
      const doctor = await doctorModel.findByIdAndDelete(doctorId);

      // Update user to set isDoctor to false
      const user = await userModel.findById(doctor.userId);
      if (user) {
        user.isDoctor = false;
        const notification = user.notification;
        notification.push({
          type: "doctor-account-request-updated",
          message: "Your Doctor Account Request Has Been Rejected",
          onClickPath: "/notification",
        });
        await user.save();
      }

      res.status(200).send({
        success: true,
        message: "Doctor Rejected and Removed Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Changing Account Status",
      error,
    });
  }
};


// Delete user (Block)
const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user and remove from the users collection
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // If user is a doctor, remove them from the doctor collection as well
    if (user.isDoctor) {
      await doctorModel.findOneAndDelete({ userId: userId });
    }

    res.status(200).send({
      success: true,
      message: "User blocked and removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error blocking the user",
      error,
    });
  }
};


module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  deleteUserController,
};
