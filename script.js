const btn = document.querySelector(".btn");
const res = document.querySelector(".result");
const userID = document.querySelector(".userID");
const id = document.querySelector(".id");
const title = document.querySelector(".title");
const body = document.querySelector(".body");
const loader = document.querySelector(".loader");
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
async function getPosts() {
  try {
    loader.style.display = "block";
    btn.disabled = true;
    btn.style.backgroundColor = "gray";
    const url = `https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`;
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
    loader.style.display = "none";
    btn.style.backgroundColor = "chocolate";
    btn.disabled = false;
    console.log("Запрос совершен");
  }
}
btn.addEventListener("click", getPosts);
