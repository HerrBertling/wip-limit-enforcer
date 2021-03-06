const schema = require("./schema");

async function handleNewPullRequest(context) {
  let config = await getConfig(context);
  console.log(config.wipLimit);
  // get all pull requests
  const response = await context.github.issues.getForRepo(
    context.repo({
      state: "open"
    })
  );
  const allOpenPullRequests = response.data.filter(data => data.pull_request);

  // filter out by config filter words
  const filteredPullRequests = allOpenPullRequests.filter(pr => {
    return config.filterWords.some(word => {
      return !pr.title.includes(word) && !pr.body.includes(word);
    });
  });

  // if filtered pull requests are more than the wip limit, close PR
  const hasReachedWipLimit = filteredPullRequests.length > config.wipLimit;

  if (hasReachedWipLimit) {
    await context.github.issues.createComment(
      context.issue({ body: config.closeMessage })
    );
    const params = context.issue({ state: "closed" });
    return context.github.issues.edit(params);
  }
}

async function getConfig(context) {
  const { owner, repo } = context.issue();
  let config;
  try {
    let repoConfig = await context.config("wip-limit.yml");
    const { error, value } = schema.validate(repoConfig);
    if (error) {
      throw error;
    }
    config = value;
  } catch (err) {
    robot.log.warn({ err: new Error(err), owner, repo }, "Invalid config");
  }

  return config;
}

module.exports = handleNewPullRequest;
