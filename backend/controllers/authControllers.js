import User from '../models/user';
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url';
import crypto from 'crypto';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import sendEmail from '../utils/sendEmail';

// cloudinary config setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// register user  =>  /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
  let result = {};

  // if user hasn't uploaded avatar on register page, assign default avatar
  if (req.body.avatar === null) {
    result.secure_url =
      'https://res.cloudinary.com/lwprojects/image/upload/v1621454892/bookit/avatars/default_avatar_q5fq5h.jpg';
    result.public_id = 'bookit/avatars/default_avatar_q5fq5h';
  } else {
    result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });
  }

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Account Registered Successfully',
  });
});

// current user profile  =>  /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile  =>  /api/me/update
const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
  }

  // update password if present in req.body
  if (req.body.password) {
    user.password = req.body.password;
  }

  // update avatar
  if (req.body.avatar !== '') {
    const image_id = user.avatar.public_id;

    // delete prev user image/avatar (but only if not default system avatar)
    if (image_id !== 'bookit/avatars/default_avatar_q5fq5h')
      await cloudinary.v2.uploader.destroy(image_id);

    // upload new image
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

// forgot password  =>  /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  // since we're not able to use req.get('host') from express in Next.js
  // to get our url (dev/prod) we need to make sure of next-absolute-url package
  // const resetUrl = `${req.get('host')}/password/reset/${resetToken}`

  // get origin
  const { origin } = absoluteUrl(req);

  // create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows: \n\n 
    ${resetUrl} \n\n If you have not requested this email, then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'BookIT Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password  =>  /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  // find user with the same resetPasswordToken that was just created with
  // reset token that was requested and sent from client
  // also make sure that it hasn't expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('Password reset token is invalid or has expired', 400),
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  // setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: 'Password has been updated' });
});

export {
  registerUser,
  currentUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
