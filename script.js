const btn = document.querySelector(".btn");
const res = document.querySelector(".result");
const userID = document.querySelector(".userID");
const elementID = document.querySelector(".id");
const title = document.querySelector(".title");
const body = document.querySelector(".body");
const loader = document.querySelector(".loader");
const btnClear = document.querySelector(".btn__clear");

function showBtnClear() {
  if (uniqeID.size === 100) {
    btnClear.style.display = "block";
  }
}

const uniqeID = new Set();

function saveUniqueID() {
  const uniqueArrayMass = Array.from(uniqeID);
  localStorage.setItem("uniqueID", JSON.stringify(uniqueArrayMass));
}

function getUniqueID() {
  const uniqueArrayFromLs = localStorage.getItem("uniqueID");
  const retrievedObject = JSON.parse(uniqueArrayFromLs) || [];
  for (let i = 0; i < retrievedObject.length; i++) {
    uniqeID.add(retrievedObject[i]);
    console.log(uniqeID);
  }
}

function blockBtn() {
  if (uniqeID.size >= 100) {
    btn.style.backgroundColor = "gray";
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

function getRandomUniqueId() {
  let id;
  do {
    id = Math.floor(Math.random() * 100) + 1;
  } while (uniqeID.has(id));
  console.log(uniqeID);
  blockBtn();
  return id;
}

function getLastID() {
  const arrayUniqueID = Array.from(uniqeID);
  const lastID = arrayUniqueID[arrayUniqueID.length - 1];
  console.log(lastID);
  return lastID;
}

function savedLastID() {
  const lastID = getLastID();
  localStorage.setItem("lastid", lastID);
}

function lastIdFromLS() {
  return JSON.parse(localStorage.getItem("lastid"));
}

function startLoader() {
  loader.style.display = "block";
  btn.disabled = true;
  btn.style.backgroundColor = "gray";
}

function endLoader() {
  loader.style.display = "none";
  btn.style.backgroundColor = "chocolate";
  btn.disabled = false;
  blockBtn();
}

async function getPosts(postid) {
  let id;
  try {
    console.log("postid", postid);
    if (postid) {
      id = postid;
    } else {
      id = getRandomUniqueId();
    }

    startLoader();

    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const post = await response.json();
    userID.innerHTML = `id Полььзователя: ${post.userId}`;
    elementID.innerHTML = `id: ${post.id}`;
    title.innerHTML = `Title: ${post.title}`;
    body.innerHTML = `body: ${post.body}`;
  } catch (error) {
    alert("ошибка запроса");
  } finally {
    uniqeID.add(id);
    showBtnClear();
    saveUniqueID();
    savedLastID();
    console.log("Запрос совершен");
    endLoader();
  }
}
getUniqueID();
getPosts(lastIdFromLS());
btn.addEventListener("click", () => {
  getPosts();
});

btnClear.addEventListener("click", () => {
  uniqeID.clear();
  localStorage.clear(uniqeID);
  btn.style.backgroundColor = "chocolate";
  blockBtn();
});

function fullPost() {
  for (let i = 0; i < 100; i++) {
    uniqeID.add(i);
  }
}
