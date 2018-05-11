module.exports = robot => {
  const handleNewPullRequest = require("./lib/new-pull-request");
  robot.log("Yay, the app was loaded!");
  robot.on(
    ["pull_requests.opened", "pull_requests.reopened"],
    handleNewPullRequest
  );
};
