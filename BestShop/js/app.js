// Menu button

const btn = document.querySelector(".menu-button");
const menu = document.querySelector(".page-menu-list");

btn.addEventListener("click", function () {
    menu.classList.toggle("show");
    btn.classList.toggle("show");
});


// Dropdown list


const $select = document.querySelector(".calculator-select");
const $selectList = document.querySelector(".select-dropdown");
const $arrowUp = $select.querySelector("i");

$select.addEventListener("click", function () {
    $selectList.classList.toggle("show");
    $arrowUp.classList.toggle("show");
});


// Calculator

const $inputs = document.querySelectorAll(".calculator-input input");
const $inputList = document.querySelectorAll(".list-item");
const $itemList = document.querySelectorAll(".item-calc")
const $itemPrice = document.querySelectorAll(".item-price")
const $dropDownList = document.querySelectorAll(".select-list");
const $inputSelect = document.querySelector(".select-input");
const $checkbox = document.querySelectorAll(".account");
const $totalPrice = document.querySelector(".total-price");
const $warn =document.querySelectorAll(".calculator-input");


const price = {
    products: 1.5,
    orders: 0.5,
    package: {
        basic: 0,
        professional: 25,
        premium: 60
    },
    account: 35,
    rental: 5
};

const array = [];

function summary () {
    let result = array.reduce(function (a, b) {
        return a + b;
    });
    $totalPrice.innerText = "$" + result;
}

$inputs.forEach(function (input, index) {
    input.addEventListener("keyup", function (e) {
        const inputNumber = input.value;
        const productPrice = price[input.id];
        const multiply = inputNumber * productPrice;
        $inputList[index].classList.add("display");
        if (inputNumber >= 0 && inputNumber.length >= 0 && inputNumber.length < 4) {
            $itemList[index].innerText = inputNumber + " * " + "$" + productPrice;
            $itemPrice[index].innerText = "$" + multiply;
            array[index] = multiply;
            summary();
        } else if (inputNumber.length >= 4) {
            input.value = input.value.substr(0,3);
            $warn[index].classList.add("warning");
        } else if(inputNumber === false){

        }
    });
});


$dropDownList.forEach(function (li) {
    li.addEventListener('click', function () {
        $inputSelect.innerText = li.innerText;
        $inputList[2].classList.add("display");
        $itemList[2].innerText = li.innerText;
        const productPrice = price.package[li.dataset.value];
        $itemPrice[2].innerText = "$" + productPrice;
        array[2] = productPrice;
        summary();
    });
});

$checkbox.forEach(function (box) {
    box.addEventListener("change", function (){
        if (box.checked === true) {
            $inputList[box.dataset.id].classList.add("display");
            const productPrice = price[box.id];
            $itemPrice[box.dataset.id].innerText = "$" + productPrice;
            array[box.dataset.id] = productPrice;
            let result = array.reduce(function (a, b) {
                return a + b;
            });
            $totalPrice.innerText = "$" + result;
        }
        else {
            $inputList[box.dataset.id].classList.remove("display");
            array[box.dataset.id] = 0;
            summary();
        }
    });
});
