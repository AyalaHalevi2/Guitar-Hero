//Data

interface Product {
  url: string;
  name: string;
  amountinStock: number;
  price: number;
  id: number;
}



let guitarsArray: Product[] = [];
let showForm = false;
let idcounter = 0;
let editGuitar:Product[] =[];

//view functions
function htmlProduct(product: Product): string {
  return `
    <div class="product">
        <div class="product__img"><img src="${
          product.url
        }" alt="guitarImg"></div>
        <div class="product__name">${product.name}</div> 
        <div class="product__price">price: ${product.price}$</div> 
        <div class="product__stock">${
          product.amountinStock > 0
            ? "In Stock: " + product.amountinStock
            : "Out Of Stock"
        }</div>
        <div class="product__delete" title="This will delete the item permanently!"data-id ="${product.id}"><img src="./Images/trash.png" alt="trashcan"></div>
        <div class="product__edit" data-id ="${product.id}">EDIT ME</div>

    </div>
    `;
}

function renderProducts(guitars: Array<Product>) {
  try {
    const guitarGrid = document.getElementById("guitarsRoot");
    if (!guitarGrid) throw new Error("guitarsRoot element not found");
    guitarGrid.innerHTML = guitars
      .map((guitar) => htmlProduct(guitar))
      .join("");
  } catch (error) {
    console.error("error rendering guitars", error);
  }
}
//control functions

window.addEventListener("DOMContentLoaded", () => {
  try {
    const button = document.getElementById("addGuitarButton");
    if (!button) throw new Error("addGuitarButton button not found");
    button.addEventListener("click", () => {
      showForm = !showForm;
      displayForm(showForm);
    });
    const addForm = document.querySelector(".addGuitar");
    if (!addForm) throw new Error("Form not found");
    addForm.addEventListener("submit", handleSubmit);
  } catch (error) {
    console.error("error events: ", error);
  }

});

//model functions

function handleSubmit(event) {
  try {
    event.preventDefault(); //*
    console.log("Form submitted");
    if (!(event.target instanceof HTMLFormElement))
      throw new Error("Event target is not a form");
    const formData = new FormData(event.target); //*
    const data = Object.fromEntries(formData.entries()); //*
    console.log("Form data:", data); //*
    const newProduct: Product = {
      url: data.urlImage as string,
      name: data.name as string,
      amountinStock: parseInt(data.inStock as string, 10),
      price: parseFloat(data.price as string),
      id: idcounter,
    };
    idcounter++;
    guitarsArray.push(newProduct);
    renderProducts(guitarsArray);
    deleteButton();
    event.target.reset();
    console.dir(guitarsArray);
    showForm = false;
    displayForm(showForm);
  } catch (error) {
    console.error("error submiting: ", error);
  }
}

function displayForm(isVisible: boolean): void {
  try {
    const addNewGuitar = document.getElementById("addGuitar");
    if (!addNewGuitar) throw new Error("addGuitar element not found");
    addNewGuitar.style.display = isVisible ? "flex" : "none";
    const addButton = document.getElementById("addGuitarButton");
    if (!addButton) throw new Error("addGuitarButton element not found");
    addButton.style.display = isVisible ? "none" : "flex";
  } catch (error) {
    console.error("error displayForm", error);
  }
}

function deleteButton() {
  const deleteButtons = document.querySelectorAll(".product__delete");

  try {
    if (!deleteButtons) throw new Error("can't find an element to delete");

    deleteButtons.forEach((button) => {
      const deleteId = Number(button.getAttribute("data-id"));
      button.addEventListener("click", function (e) {
        guitarsArray = guitarsArray.filter(guitar => guitar.id !== deleteId);
        renderProducts(guitarsArray);
        deleteButton();
      });
    });
  } catch (error) {
    console.error("can't find an element to delete", error);
  }
}
