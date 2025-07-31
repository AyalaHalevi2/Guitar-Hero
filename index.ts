//Data

interface Product {
    url: string;
    name: string;
    amountinStock: number;
    price: number;
}

const guitarsArray: Product[] = []
let showForm = false

//view functions
function htmlProduct(product: Product): string {
    return `
    <div class="product">
        <div class="product__img"><img src="${product.url}" alt="guitarImg"></div>
        <div class="product__name">${product.name}</div> 
        <div class="product__price">price: ${product.price}$</div> 
        <div class="product__stock">${product.amountinStock > 0 ? "In Stock: " + product.amountinStock : "Out Of Stock"}</div>
    </div>
    `
}

function renderProducts(guitars: Array<Product>) {
    try {
        const guitarGrid = document.getElementById("guitarsRoot")
        if (!guitarGrid) throw new Error("guitarsRoot element not found");
        guitarGrid.innerHTML = guitars.map((guitar) => htmlProduct(guitar)).join("")

    } catch (error) {
        console.error("error rendering guitars", error);
    }
}
//control functions

window.addEventListener("DOMContentLoaded", () => {
    new ThemeToggle();
    new FontSizeToggle();
    try {
        const button = document.getElementById("addGuitarButton");
        if (!button) throw new Error("addGuitarButton button not found");
        button.addEventListener("click", () => {
            showForm = !showForm
            displayForm(showForm)
        });
        const addForm = document.querySelector('.addGuitar');
        if (!addForm) throw new Error("Form not found");
        addForm.addEventListener("submit", (handleSubmit));

    } catch (error) {
        console.error("error events: ", error)
    }
})





//model functions


function handleSubmit(event) {
    try {
        event.preventDefault(); //*
        console.log('Form submitted');
        if (!(event.target instanceof HTMLFormElement)) throw new Error('Event target is not a form');
        const formData = new FormData(event.target);//*
        const data = Object.fromEntries(formData.entries());//*
        console.log('Form data:', data);//*
        const newProduct: Product = {
            url: data.urlImage as string,
            name: data.name as string,
            amountinStock: parseInt(data.inStock as string, 10),
            price: parseFloat(data.price as string)
        };
        guitarsArray.push(newProduct);
        renderProducts(guitarsArray);
        event.target.reset();
        console.dir(guitarsArray)
        showForm = false;
        displayForm(showForm);
    } catch (error) {
        console.error("error submiting: ", error);
    }
}

function displayForm(isVisible: boolean): void {
    try {
        const addNewGuitar = document.getElementById("addGuitar")
        if (!addNewGuitar) throw new Error("addGuitar element not found");
        addNewGuitar.style.display = isVisible ? "flex" : "none";
        const addButton = document.getElementById("addGuitarButton")
        if (!addButton) throw new Error("addGuitarButton element not found");
        addButton.style.display = isVisible ? "none" : "flex";
    } catch (error) {
        console.error("error displayForm", error)
    }
}



class ThemeToggle {
    private toggle: HTMLInputElement;
    private isDark: boolean = false;

    constructor() {
        this.toggle = document.getElementById('theme-toggle') as HTMLInputElement;
        if (this.toggle) {
            this.init();
        }
    }

    private init(): void {
        this.toggle.addEventListener('change', () => {
            this.setDark(this.toggle.checked);
        });
    }

    private setDark(isDark: boolean): void {
        this.isDark = isDark;
        
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    public getCurrentTheme(): 'light' | 'dark' {
        return this.isDark ? 'dark' : 'light';
    }
}

class FontSizeToggle {
    private button: HTMLButtonElement;
    private label: HTMLElement;
    private currentSize: 'small' | 'medium' | 'large' = 'medium';
    private sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];

    constructor() {
        this.button = document.getElementById('font-size-toggle') as HTMLButtonElement;
        this.label = document.getElementById('font-size-label') as HTMLElement;
        if (this.button && this.label) {
            this.init();
        }
    }

    private init(): void {
        this.button.addEventListener('click', () => {
            this.toggleFontSize();
        });
        
        this.updateLabel();
    }

    private toggleFontSize(): void {
        const currentIndex = this.sizes.indexOf(this.currentSize);
        const nextIndex = (currentIndex + 1) % this.sizes.length;
        this.currentSize = this.sizes[nextIndex];
        
        this.setFontSize(this.currentSize);
        this.updateLabel();
    }

    private setFontSize(size: 'small' | 'medium' | 'large'): void {
        document.documentElement.removeAttribute('data-font-size');
        
        if (size !== 'medium') {
            document.documentElement.setAttribute('data-font-size', size);
        }
    }

    private updateLabel(): void {
        this.label.textContent = this.currentSize.charAt(0).toUpperCase() + this.currentSize.slice(1);
        
        const fontSizeText = this.button.querySelector('.font-size-text') as HTMLElement;
        if (fontSizeText) {
            switch (this.currentSize) {
                case 'small':
                    fontSizeText.style.fontSize = '1rem';
                    break;
                case 'medium':
                    fontSizeText.style.fontSize = '1.2rem';
                    break;
                case 'large':
                    fontSizeText.style.fontSize = '1.4rem';
                    break;
            }
        }
    }

    public getCurrentSize(): 'small' | 'medium' | 'large' {
        return this.currentSize;
    }
}