const asyncGetRequest = require("./getAndProcess");

const asyncRebuild = async () => {
  const result = await asyncGetRequest().then(console.log);
  return result;
};
module.exports = asyncRebuild;
