import api from './api.js';
import store from './store.js';
//-------------- GET Repos for username --------//



//-------------- generate templates --------//

const generateRepoElement = function(gitHubRepos) {
  console.log(gitHubRepos.name);
  return`
    <li>
      <span>${gitHubRepos.name}</span>
      <span>${gitHubRepos.url}</span>
    </li>
  `;
};

const generateSearchScreen = function() {
  return`
    <h1>
      Search GitHub
    </h1>
    <form>
      <label for="search">Enter GitHub handle</label>
      <input id="handle" name="search" type="text" placeholder="e.g. MetaSquirrel3"/> 
      <input type="submit"/>
    </form>
  `;
};

const generateReposString = function (reposList) {
  const items = reposList.map((item) => generateRepoElement(item));
  console.log(items);
  const repos = `<ul>${items.join('')}</ul>`;
  return repos;
};

const render = function () {
  const metaRepos = store.repos;
  const repos = metaRepos[0];
  console.log(repos[0]);
  const reposString = generateReposString(repos);
  console.log(reposString);
  $('main').html(reposString);
};

const handleSearchClick = function () {
  $('body').submit(event => {
    event.preventDefault();
    console.log('submit click detected');
    const handle = $('#handle').val();
    console.log('you entered '+handle);
    api.getRepos(handle)
      .then(response => {
        store.addRepos(response);
        console.log(store.repos);
        render();
      });
  });
};

/* const handleStartPage = function () {

}; */

const bundledFunctions = function () { 
  handleSearchClick();
  generateSearchScreen();
};

export default {
  bundledFunctions
};