/////////////////////////////////////// theme switcher //////////////////////////////////
const togglers = document.querySelectorAll(".theme-switcher");
const body = document.querySelector("body");
const sun = document.querySelector(".light");
const moon = document.querySelector(".dark");

function themeSwitcher() {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
}

togglers.forEach((toggler) => {
  toggler.addEventListener("click", function () {
    body.classList == "dark-theme" ? themeSwitcher() : themeSwitcher();
  });
});

////////////////////////////////////// gettting and displaying user/////////////////////
const card = document.querySelector(".card");

// getting data from user input bar/////////
const input_el = document.querySelector(".username-input");
const SearchBtn = document.querySelector(".search");

// get data from api //////////////////

function getUserData(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message == "Not Found") {
        alert("user not found");
      } else {
        renderCard(data);
      }
    });
}

// variables for render data
const Profileimg = document.querySelector(".user-img");

const Name = document.querySelector(".name");
const userName = document.querySelector(".user-name");
const joined = document.querySelector(".join-date");

const bio = document.querySelector(".bio");

const noOfRepo = document.querySelector(".no-of-repo");
const noOfFollowers = document.querySelector(".no-of-followers");
const noOfFollowings = document.querySelector(".no-of-followings");

const Location = document.querySelector(".location");
const userUrl = document.querySelector(".user-url");
const userTwitter = document.querySelector(".user-twitter");
const userCompany = document.querySelector(".user-company");

function renderCard(data) {
  Profileimg.src = data.avatar_url;
  Name.textContent = getSocials(data, "name");
  userName.textContent = `@${data.login}`;
  userName.href = data.html_url;
  joined.textContent = `joined ${getDate(data.created_at)}`;
  bio.textContent = `${
    data.bio == null ? "This profile has no bio" : data.bio
  }`;
  noOfRepo.textContent = `${data.public_repos}`.padStart(2, "0");
  noOfFollowers.textContent = `${data.followers}`.padStart(2, "0");
  noOfFollowings.textContent = `${data.following}`.padStart(2, "0");
  Location.textContent = getSocials(data, "location");
  userUrl.textContent = getSocials(data, "blog");
  userTwitter.textContent = getSocials(data, "twitter_username");
  getTwitterWebsiteUrl(data, "blog", userUrl);
  getTwitterWebsiteUrl(data, "twitter_username", userTwitter);
  userCompany.textContent = getSocials(data, "company");
}

function getDate(timeZone) {
  const newDate = new Date(timeZone);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return newDate.toLocaleString("en", options);
}

function getTwitterWebsiteUrl(data, task, link) {
  if (data[task] == "" || data[task] == null) {
    link.removeAttribute("href");
  } else if (task == "blog") {
    if (data[task].includes("http")) {
      link.href = data[task];
    } else {
      link.href = `https://${data[task]}`;
    }
  } else {
    link.href = `https://twitter.com/${data[task]}`;
  }
}

function swichToUserGitHub(data, task, link) {
  link.href = data[task];
}

function getSocials(data, task) {
  return data[task] == "" || data[task] == null
    ? `Not available`
    : `${data[task]}`;
}

getUserData("Zainabdullahali");

SearchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!input_el.value) return;
  getUserData(input_el.value);
});
