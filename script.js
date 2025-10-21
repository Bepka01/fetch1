const btn = document.querySelector(".btn");
const res = document.querySelector(".result");
const userID = document.querySelector(".userID");
const id = document.querySelector(".id");
const title = document.querySelector(".title");
const body = document.querySelector(".body");
const loader = document.querySelector(".loader");

const allLastID = [];

const uniqeID = new Set();

function getLastPost() {
  const arrayFromSet = Array.from(uniqeID);
  return arrayFromSet[arrayFromSet.length - 1];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
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
}
async function getUniquePost(attempt = 1) {
  if (attempt > 10) {
    throw new Error("Не удалось найти уникальный пост после 10 попыток");
  }
  const randomId = getRandomNumber();
  const url = `https://jsonplaceholder.typicode.com/posts/${randomId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const post = await response.json();
  if (uniqeID.has(post.id)) {
    console.log("Этот пост уже был , грузим другой");
    return getUniquePost(attempt + 1);
  }
  console.log("Этого поста не было");
  return post;
}
async function getPosts() {
  try {
    startLoader();
    const post = await getUniquePost();

    userID.innerHTML = `id Полььзователя: ${post.userId}`;
    id.innerHTML = `id: ${post.id}`;
    title.innerHTML = `Title: ${post.title}`;
    body.innerHTML = `body: ${post.body}`;
    allLastID.push(post.id);
    uniqeID.add(post.id);
  } catch (error) {
    alert("ошибка запроса");
  } finally {
    console.log("Запрос совершен");
    console.log(uniqeID);
    console.log(getLastPost());
    endLoader();
  }
}

btn.addEventListener("click", getPosts);
