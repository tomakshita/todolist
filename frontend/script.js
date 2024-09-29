const div = document.querySelector(".todolist");
const button = document.querySelector(".button");
const inputval = document.querySelector(".inputval");

const getalltodo = async function () {
  const response = await fetch(`http://localhost:8000/all`);
  const data = await response.json();

  const array_data = data.data;

  for (let i = 0; i < array_data.length; i++) {
    const tododiv = document.createElement("div");
    tododiv.style.display = "flex";
    const h1 = document.createElement("h1");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = array_data[i].todostatus;
    console.log(array_data[i].todostatus, array_data);

    tododiv.appendChild(h1);
    tododiv.appendChild(checkbox);
    div.appendChild(tododiv);
    h1.innerText = array_data[i].todoName;


    checkbox.addEventListener("input", async function () {
      const response = await fetch(`http://localhost:8000/updatetodo`, {
        method: "PUT",
        body: JSON.stringify({
          id: array_data[i]._id,
          status: !array_data[i].todostatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  }
};

button.addEventListener("click", async function () {
  const response = await fetch(`http://localhost:8000/todo`, {
    method: "POST",
    body: JSON.stringify({ todo: inputval.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  div.innerHTML = "";
  getalltodo();
});

getalltodo();
