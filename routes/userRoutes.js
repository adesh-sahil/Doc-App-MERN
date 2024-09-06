const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDocotrsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");


// router object
const router = express.Router();

// routes
// LOGIN || POST
router.post('/login', loginController)

// REGISTER || POST
router.post('/register', registerController)

// Auth || POST
router.post('/getUserData', authMiddleware,authController)

// Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController)

// Notifications || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController)

router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController)

// GET ALL DOC || GET
router.get("/getALLDoctors", authMiddleware, getAllDocotrsController)

// BOOK APPOINTMENT || POST
router.post("/book-appointment", authMiddleware, bookAppointmentController)

// BOOKING AVAILABILITY 
router.post("/booking-availability", authMiddleware, bookingAvailabilityController)

// APPOINTMENT LIST
router.get("/user-appointments", authMiddleware, userAppointmentsController)

module.exports = router;

