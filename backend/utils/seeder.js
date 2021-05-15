const mongoose = require('mongoose');

// const dbConnect = require('../backend/config/dbConnect');
const Room = require('../models/room');
const roomsData = require('../data/rooms');

mongoose.connect('mongodb://localhost:27017/bookit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log('Rooms are deleted');

    await Room.insertMany(roomsData);
    console.log('All Rooms are added.');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
