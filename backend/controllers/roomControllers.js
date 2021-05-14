const mongoose = require('mongoose');

import Room from '../models/room';

// get all room  =>  /api/rooms
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({ success: true, count: rooms.length, rooms });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get room details  =>  /api/rooms/:id
const getSingleRoom = async (req, res) => {
  const roomId = mongoose.Types.ObjectId(req.query.id);
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found with this ID',
      });
    }

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// create new room  =>  /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.Room });
  }
};

// Update room details  =>  /api/rooms/:id
const updateRoom = async (req, res) => {
  // const roomId = mongoose.Types.ObjectId(req.query.id);
  try {
    let room = await Room.findById(req.query.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found with this ID',
      });
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true, // return object after it's been updated
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete room details  =>  /api/rooms/:id
const deleteRoom = async (req, res) => {
  console.log(req.query.id);
  // const roomId = mongoose.Types.ObjectId(req.query.id);
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found with this ID',
      });
    }

    await room.remove();

    res.status(200).json({ success: true, message: 'Room has been deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
