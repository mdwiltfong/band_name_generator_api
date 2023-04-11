function dynamicOrigin(origin, callback) {
  const whiteList = process.env.WHITE_LIST;
  if (whiteList.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
}

const options = {
  origin: dynamicOrigin,
};

module.exports = options;
