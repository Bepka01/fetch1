const btn = document.querySelector(".btn");
const res = document.querySelector(".result");
const userID = document.querySelector(".userID");
const id = document.querySelector(".id");
const title = document.querySelector(".title");
const body = document.querySelector(".body");
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
async function getPosts() {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response;
    userID.innerHTML = `id Полььзователя: ${posts.userId}`;
    id.innerHTML = `id: ${posts.id}`;
    title.innerHTML = `Title: ${posts.title}`;
    body.innerHTML = `body: ${posts.body}`;
  } catch (error) {
    alert("ошибка запроса");
  } finally {
    console.log("Запрос совершен");
  }
}
btn.addEventListener("click", getPosts);
