import User from '../models/user';
import cloudinary from 'cloudinary';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

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

export { registerUser, currentUserProfile };
