import "./variables.css";
import "./styles.css";

const form = document.getElementById("form");
const container = document.getElementById("container");
const body = document.getElementById("body");


const handleClick = (src) => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.innerHTML = `<img src=${src} class="picture">`;
  body.classList.add("scroll-hidden");
  overlay.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG")
      body.classList.remove("scroll-hidden");
    body.removeChild(overlay);
  });
  body.appendChild(overlay);

};

const createImage = (src, item) => {
  const picture = document.createElement("img");
  picture.classList.add("img");
  picture.setAttribute("src", src);
  picture.addEventListener("click", () => handleClick(src));
  item.appendChild(picture);
};

const handleChange = (event, id) => {
  const data = localStorage.getItem("items");
  const handleData = JSON.parse(data);
  const middleSteps = handleData.map((item) => {
    if (item.id === id)   {
      item.text = event.target.value;
      return item;
    }
    return item;
  });
  const currentData = JSON.stringify(middleSteps);
  localStorage.setItem("items", currentData);
};

const createComment = (text, item, id) => {
  const com = document.createElement("input");
  com.classList.add("comment");
  com.setAttribute("type", "text");
  com.setAttribute("value", text);
  com.addEventListener("change", (event) => handleChange(event, id));
  com.maxLength = 10;
  item.appendChild(com);
};

const createItem = (src, text, id) => {
  const item = document.createElement("div");
  item.classList.add("item");
  createImage(src, item);
  createComment(text, item, id);
  container.appendChild(item);
};

const onSubmit = (e) => {
  e.preventDefault();
  const data = localStorage.getItem("items");
  const src = e.target[0].value;
  const text = e.target[1].value;
  if (data) {
    const array = JSON.parse(data);
    const id = array.length + 1;
    array.push({ src, text, id });
    const currentArray = JSON.stringify(array);
    localStorage.setItem("items", currentArray);
    createItem(src, text, id);
  } else {
    const items = [];
    items.push({ src, text, id: 1 });
    const currentArray = JSON.stringify(items);
    localStorage.setItem("items", currentArray);
    createItem(src, text, 1);
  }
};

form.addEventListener("submit", onSubmit);

const displayElements = () => {
  const data = localStorage.getItem("items");

  if (data) {
    const array = JSON.parse(data);
    console.log(array);
    array.map(({ src, text, id }) => {
      createItem(src, text, id);
    });
  }
};

displayElements();

