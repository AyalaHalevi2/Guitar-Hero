//Data
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var guitarsArray = [];
var showForm = false;
var idcounter = 0;
var editGuitar = [];
//view functions
function htmlProduct(product) {
    return "\n    <div class=\"product\">\n        <div class=\"product__img\"><img src=\"" + product.url + "\" alt=\"guitarImg\"></div>\n        <div class=\"product__name\">" + product.name + "</div> \n        <div class=\"product__price\">price: " + product.price + "$</div> \n        <div class=\"product__stock\">" + (product.amountinStock > 0
        ? "In Stock: " + product.amountinStock
        : "Out Of Stock") + "</div>\n        <div class=\"product__delete\" title=\"This will delete the item permanently!\"data-id =\"" + product.id + "\"><img src=\"./Images/trash.png\" alt=\"trashcan\"></div>\n        <div class=\"product__edit\" data-id =\"" + product.id + "\">EDIT ME</div>\n\n    </div>\n    ";
}
function renderProducts(guitars) {
    try {
        var guitarGrid = document.getElementById("guitarsRoot");
        if (!guitarGrid)
            throw new Error("guitarsRoot element not found");
        guitarGrid.innerHTML = guitars
            .map(function (guitar) { return htmlProduct(guitar); })
            .join("");
    }
    catch (error) {
        console.error("error rendering guitars", error);
    }
}
//control functions
window.addEventListener("DOMContentLoaded", function () {
    try {
        var button = document.getElementById("addGuitarButton");
        if (!button)
            throw new Error("addGuitarButton button not found");
        button.addEventListener("click", function () {
            showForm = !showForm;
            displayForm(showForm);
        });
        var addForm = document.querySelector(".addGuitar");
        if (!addForm)
            throw new Error("Form not found");
<<<<<<< HEAD
        addForm.addEventListener("submit", handleSubmit);
=======
        addForm.addEventListener("submit", (handleSubmit));
        var sortBy = document.getElementById("sortSelect");
        if (!sortBy)
            throw new Error("sortSelect select input not found");
        sortBy.addEventListener("change", function (event) { handleSortSelect(event); });
>>>>>>> origin/dev
    }
    catch (error) {
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
        var formData = new FormData(event.target); //*
        var data = Object.fromEntries(formData.entries()); //*
        console.log("Form data:", data); //*
        var newProduct = {
            url: data.urlImage,
            name: data.name,
            amountinStock: parseInt(data.inStock, 10),
            price: parseFloat(data.price),
            id: idcounter
        };
        idcounter++;
        guitarsArray.push(newProduct);
        renderProducts(guitarsArray);
        deleteButton();
        event.target.reset();
        console.dir(guitarsArray);
        showForm = false;
        displayForm(showForm);
    }
    catch (error) {
        console.error("error submiting: ", error);
    }
}
function displayForm(isVisible) {
    try {
        var addNewGuitar = document.getElementById("addGuitar");
        if (!addNewGuitar)
            throw new Error("addGuitar element not found");
        addNewGuitar.style.display = isVisible ? "flex" : "none";
        var addButton = document.getElementById("addGuitarButton");
        if (!addButton)
            throw new Error("addGuitarButton element not found");
        addButton.style.display = isVisible ? "none" : "flex";
    }
    catch (error) {
        console.error("error displayForm", error);
    }
}
<<<<<<< HEAD
function deleteButton() {
    var deleteButtons = document.querySelectorAll(".product__delete");
    try {
        if (!deleteButtons)
            throw new Error("can't find an element to delete");
        deleteButtons.forEach(function (button) {
            var deleteId = Number(button.getAttribute("data-id"));
            button.addEventListener("click", function (e) {
                guitarsArray = guitarsArray.filter(function (guitar) { return guitar.id !== deleteId; });
                renderProducts(guitarsArray);
                deleteButton();
            });
        });
    }
    catch (error) {
        console.error("can't find an element to delete", error);
=======
function handleSortSelect(event) {
    try {
        var guitars = __spreadArrays(guitarsArray);
        var selectValue = event.target.value;
        if (!(selectValue))
            throw new Error("select value not found");
        switch (selectValue) {
            case "priceHTL":
                guitars.sort(function (a, b) { return b.price - a.price; });
                renderProducts(guitars);
                break;
            case "priceLTH":
                guitars.sort(function (a, b) { return a.price - b.price; });
                renderProducts(guitars);
                break;
            case "stock":
                guitars.sort(function (a, b) { return b.amountinStock - a.amountinStock; });
                renderProducts(guitars);
                break;
            case "default":
                break;
            default:
                break;
        }
    }
    catch (error) {
        console.error("error handaling sort select: ", error);
>>>>>>> origin/dev
    }
}
