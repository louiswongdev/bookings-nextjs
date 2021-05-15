class APIFeatures {
  constructor(query, queryStr) {
    this.query = query; // Room.find()
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...location });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy);

    // Remove fields from query
    // i.e if we're adding a filter, we want to remove 'location' since that is not a property on Room
    // http:localhost:3000/api/rooms?location=New York&category=twins
    const removeFields = ['location'];
    removeFields.forEach(el => delete queryCopy[el]);

    console.log(queryCopy);

    this.query = this.query.find(queryCopy);
    return this;
  }
}

export default APIFeatures;
