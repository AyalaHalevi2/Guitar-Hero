//Data
var guitarsArray = [];
var showForm = false;
//view functions
function htmlProduct(product) {
    return "\n    <div class=\"product\">\n        <div class=\"product__img\"><img src=\"" + product.url + "\" alt=\"guitarImg\"></div>\n        <div class=\"product__name\">" + product.name + "</div> \n        <div class=\"product__price\">price: " + product.price + "$</div> \n        <div class=\"product__stock\">" + (product.amountinStock > 0 ? "In Stock: " + product.amountinStock : "Out Of Stock") + "</div>\n    </div>\n    ";
}
function renderProducts(guitars) {
    try {
        var guitarGrid = document.getElementById("guitarsRoot");
        if (!guitarGrid)
            throw new Error("guitarsRoot element not found");
        guitarGrid.innerHTML = guitars.map(function (guitar) { return htmlProduct(guitar); }).join("");
    }
    catch (error) {
        console.error("error rendering guitars", error);
    }
}
//control functions
window.addEventListener("DOMContentLoaded", function () {
    new ThemeToggle();
    try {
        var button = document.getElementById("addGuitarButton");
        if (!button)
            throw new Error("addGuitarButton button not found");
        button.addEventListener("click", function () {
            showForm = !showForm;
            displayForm(showForm);
        });
        var addForm = document.querySelector('.addGuitar');
        if (!addForm)
            throw new Error("Form not found");
        addForm.addEventListener("submit", (handleSubmit));
    }
    catch (error) {
        console.error("error events: ", error);
    }
});
//model functions
function handleSubmit(event) {
    try {
        event.preventDefault(); //*
        console.log('Form submitted');
        if (!(event.target instanceof HTMLFormElement))
            throw new Error('Event target is not a form');
        var formData = new FormData(event.target); //*
        var data = Object.fromEntries(formData.entries()); //*
        console.log('Form data:', data); //*
        var newProduct = {
            url: data.urlImage,
            name: data.name,
            amountinStock: parseInt(data.inStock, 10),
            price: parseFloat(data.price)
        };
        guitarsArray.push(newProduct);
        renderProducts(guitarsArray);
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
var ThemeToggle = /** @class */ (function () {
    function ThemeToggle() {
        this.isDark = false;
        this.toggle = document.getElementById('theme-toggle');
        if (this.toggle) {
            this.init();
        }
    }
    ThemeToggle.prototype.init = function () {
        var _this = this;
        this.toggle.addEventListener('change', function () {
            _this.setDark(_this.toggle.checked);
        });
    };
    ThemeToggle.prototype.setDark = function (isDark) {
        this.isDark = isDark;
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.removeAttribute('data-theme');
        }
    };
    ThemeToggle.prototype.getCurrentTheme = function () {
        return this.isDark ? 'dark' : 'light';
    };
    return ThemeToggle;
}());
