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
    const removeProperties = ({ location, page, ...rest }) => rest;

    this.query = this.query.find(removeProperties(this.queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;
