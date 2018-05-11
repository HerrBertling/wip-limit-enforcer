const Joi = require("joi");

const schema = Joi.object().keys({
  wipLimit: Joi.number()
    .default(10)
    .description(
      "Set the work in progress limit as a number of possibly open pull requests"
    ),

  closeMessage: Joi.string()
    .default(
      "👋 Thanks for your pull request! Currently, there are more than 10 pull requests open 😓 In order to keep the work in progress limited, we will close here and add a `backlog` label to this pull request."
    )
    .description(
      "Comment to post on pull requests that are closed due to the wip limit threshold"
    ),

  backlogLabel: Joi.string()
    .default("backlog")
    .description("Define the label that should be added to the closed PR."),

  filterWords: Joi.array()
    .default(["fix", "bugfix"])
    .description(
      "Set of words to filter for – pull requests containing these will not be counted towards the wip limit"
    )
});

module.exports = schema;
