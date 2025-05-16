import { Notification } from "../models/notificationSchema.js";
import { User } from "../models/userSchema.js";
import { Admin } from "../models/adminSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";

// Create a notification
export const createNotification = catchAsyncErrors(async (req, res, next) => {
    // Validate if the user is authenticated
    if (!req.user && !req.admin) {
        return next(new ErrorHandler("Not authorized.", 401));
    }
    const { receiver, receiverModel, sender, senderModel, about, title, description } = req.body;

    // Validate required fields
    if (!receiver || !receiverModel || !about || !title || !description) {
        return next(new ErrorHandler("Please provide all the required fields.", 400));
    }

    // Validate receiver existence
    let receiverDoc;
    if (receiverModel === "User") {
        receiverDoc = await User.findById(receiver);
    } else if (receiverModel === "Admin") {
        receiverDoc = await Admin.findById(receiver);
    }
    if (!receiverDoc) {
        return next(new ErrorHandler("Receiver not found.", 404));
    }

    // Validate sender existence
    let senderDoc;
    let senderRole;
    if (sender && senderModel) {
        if (senderModel === "User") {
            senderDoc = await User.findById(sender);
        } else if (senderModel === "Admin") {
            senderDoc = await Admin.findById(sender);
        }
    }

    else {
        if (req.user) {
            senderDoc = await User.findById(req.user._id.toString());
            senderRole = "User"
        } else if (req.admin) {
            senderDoc = await Admin.findById(req.admin._id.toString());
            senderRole = "Admin"
        }
    }



    // console.log(sender === req.admin._id.toString(), sender, req.admin._id.toString());



    if (!senderDoc) {
        return next(new ErrorHandler("Sender not found.", 404));
    }

    // Create and save notification
    const notification = new Notification({
        receiver,
        receiverModel,
        sender : senderDoc,
        senderModel: senderRole,
        about,
        title,
        description,
    });

    await notification.save();

    res.status(201).json({
        success: true,
        message: "Notification created successfully!",
        notification,
    });
});

// Get Notifications based on the LoggedIn User | Receiver - LoggedIn User
export const getUserNotifications = catchAsyncErrors(async (req, res, next) => {
    // Determine logged-in user/admin
    let userId, userModel;
    if (req.user) {
        userId = req.user._id;
        userModel = "User";
    } else if (req.admin) {
        userId = req.admin._id;
        userModel = "Admin";
    } else {
        return next(new ErrorHandler("Not authorized.", 401));
    }

    // Find notifications where user is receiver or sender
    const [received, sent] = await Promise.all([
        Notification.find({ receiver: userId, receiverModel: userModel })
            .populate("receiver", "-password -passwordResetToken -passwordResetExpires")
            .populate("sender", "-password -passwordResetToken -passwordResetExpires")
            .sort({ createdAt: -1 }),
        Notification.find({ sender: userId, senderModel: userModel })
            .populate("receiver", "-password -passwordResetToken -passwordResetExpires")
            .populate("sender", "-password -passwordResetToken -passwordResetExpires")
            .sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
        success: true,
        notifications: {
            received,
            sent,
        },
    });
});

// Delete All Notifications
export const deleteAllNotifications = catchAsyncErrors(async (req, res, next) => {
  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can delete all notifications.", 403));
  }

  // Delete all notifications
  await Notification.deleteMany();

  res.status(200).json({
    success: true,
    message: "All notifications have been deleted successfully.",
  });
});
