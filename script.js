const btn = document.querySelector(".btn");
const res = document.querySelector(".result");
const userID = document.querySelector(".userID");
const id = document.querySelector(".id");
const title = document.querySelector(".title");
const body = document.querySelector(".body");
const loader = document.querySelector(".loader");

const uniqeID = new Set();

function blockBtn() {
  if (uniqeID.size >= 99) {
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
  uniqeID.add(id);
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

getPosts();
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
async function getPosts() {
  try {
    startLoader();
    const url = `https://jsonplaceholder.typicode.com/posts/${getRandomUniqueId()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const post = await response.json();
    userID.innerHTML = `id Полььзователя: ${post.userId}`;
    id.innerHTML = `id: ${post.id}`;
    title.innerHTML = `Title: ${post.title}`;
    body.innerHTML = `body: ${post.body}`;
  } catch (error) {
    alert("ошибка запроса");
  } finally {
    getLastID();
    console.log("Запрос совершен");
    endLoader();
  }
}
btn.addEventListener("click", getPosts);
