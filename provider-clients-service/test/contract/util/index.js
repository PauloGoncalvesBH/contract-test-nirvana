const dateOneMonthAgo = () => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toISOString()
}

const getCurrentGitHash = () => {
  if (process.env.GIT_COMMIT) return process.env.GIT_COMMIT
  return require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
}

const getCurrentGitBranch = () => {
  if (process.env.GIT_BRANCH) return process.env.GIT_BRANCH
  return require('child_process')
    .execSync('git branch --show-current')
    .toString()
    .trim()
}

const currentGitHash = getCurrentGitHash()
const currentGitBranch = getCurrentGitBranch()
const isDefaultBranch = currentGitBranch === 'main'

module.exports = {
  dateOneMonthAgo,
  currentGitBranch,
  currentGitHash,
  isDefaultBranch
}
