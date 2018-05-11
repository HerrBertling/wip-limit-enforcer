module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!')
  robot.on('pull_request.opened', async context => {
    robot.log("New pull request opened!");
    robot.log(context);
    const params = context.pull_request({body: 'Hello World!'});
    return context.github.pull_request.createComment(params);
  })
}
