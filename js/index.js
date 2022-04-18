let form = document.getElementById("github-form");
let userList = document.getElementById("user-list");
let reposList = document.getElementById("repos-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userList.textContent = "";
  let searchValue = e.target.search.value;
  fetch(`https://api.github.com/search/users?q=${searchValue}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  })
    .then((res) => res.json())
    .then((users) => {
      let usersArray = users.items;

      usersArray.forEach((user) => {
        let userDiv = document.createElement("div");
          userDiv.addEventListener("click", (e) => {
              reposList.textContent = ""
              reposList.style.display = "block"
          let username = e.target.children[1].textContent;
          fetch(`https://api.github.com/users/${username}/repos`, {
            headers: { Accept: "application/vnd.github.v3+json" },
          }).then(res => res.json()).then(repos => {
              repos.forEach(repo => {
                  let li = document.createElement("li")
                  li.textContent = repo.full_name
                  reposList.appendChild(li)
              })
          })
        });
        userDiv.classList.add("user-div");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let a = document.createElement("a");
        a.setAttribute("href", user.html_url);
        a.setAttribute("target", "_blank");
        a.textContent = "View Profile";
        img.setAttribute("src", user.avatar_url);
        h3.textContent = user.login;
        p.appendChild(a);
        userDiv.appendChild(img);
        userDiv.appendChild(h3);
        userDiv.appendChild(p);
        userList.appendChild(userDiv);
      });
    });
});
