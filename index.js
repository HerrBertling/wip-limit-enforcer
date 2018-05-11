module.exports = robot => {
  const handleNewPullRequest = require("./lib/new-pull-request");
  robot.log("Yay, the app was loaded!");
  robot.on(
    ["pull_requests.opened", "pull_requests.reopened"],
    handleNewPullRequest
  );
  robot.on("issues.opened", async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({ body: "Hello World!" });
    robot.log(context.issue);
    // Post a comment on the issue
    return context.github.issues.createComment(params);
  });
};
