const repos = [];

const addRepos = function (repo) {
  this.repos.push(repo);
  console.log('store has updated');
  console.log(repos);
};

export default {
  repos,
  addRepos
};