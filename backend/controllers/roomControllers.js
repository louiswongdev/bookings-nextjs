const mongoose = require('mongoose');

import Room from '../models/room';

import ErrorHandler from '../../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

// get all room  =>  /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({ success: true, count: rooms.length, rooms });
});

// Get room details  =>  /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  // const roomId = mongoose.Types.ObjectId(req.query.id);

  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler('Room not found with this ID', 404));
  }

  res.status(200).json({ success: true, room });
});

// create new room  =>  /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({ success: true, room });
});

// Update room details  =>  /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {
  // const roomId = mongoose.Types.ObjectId(req.query.id);
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler('Room not found with this ID', 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true, // return object after it's been updated
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, room });
});

// Delete room details  =>  /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {
  console.log(req.query.id);
  // const roomId = mongoose.Types.ObjectId(req.query.id);

  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler('Room not found with this ID', 404));
  }

  await room.remove();

  res.status(200).json({ success: true, message: 'Room has been deleted' });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
