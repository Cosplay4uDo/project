// base obj

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 31000,
        img: 'img/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
}

////////////////////////////////////////////////////////////////////////////////////


const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    modal = document.querySelector('.modal'),
    check__body = document.querySelector('.check__body'),
    check__price = document.querySelector('.check__price'),
    check__order = document.querySelector('.check__order'),
    check__orderClose = document.querySelector('.check__order-close')

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card')
    parentId = parent.getAttribute('id');
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = [];
    for (const key in product) {
        let totalCount = 0;
        const po = product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po);
            basketBtnCount.classList.add('active')
            totalCount += po.amount;
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()

    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSumm
    }
    return total.toLocaleString()
}
function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}

function cardItemBurger(productData) {
    const { name, totalSumm: price, amount, img } = productData
    return ` 
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img src="${img}" class="wrapper__navbar-productImage" alt="">
        <div class="wrapper__navbar-infoSub">
            <p class="wrapper__navbar-infoName">${name}</p>
            <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()} </span>сум</p>
        </div>
    </div>
    <div class="wrapper__navbar-option " id="${name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-minus"  data-symbol = "-">-</button>
        <output class="wrapper__navbar_count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-plus"   data-symbol = "+">+</button>
    </div>
</div>
    `
}

basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})

closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})


window.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const parent = btn.closest('.wrapper__navbar-option')
        const attr = btn.getAttribute('data-symbol')
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idParent].amount--
            else if (attr == '+') product[idParent].amount++
            basket()
        }
    }
})


btnCard.addEventListener('click', function () {
    modal.classList.add('active')
    check__body.innerHTML = ``
    for (const key in product) {
        const { name, totalSumm, amount } = product[key]
        if (amount) {
            check__body.innerHTML +=
                `
            <div class="check__body-item">
                <p class="check__body-item_info">
                    <span>${name}</span>
                    <span>${amount}</span>
                </p>
                <p class="check__body-item_summ">${totalSumm}</p>
            </div>
            `
        }
    }
    check__price.innerHTML = totalSummProduct()
})


check__order.addEventListener('click', function () {
    window.print()
    location.reload()
})
check__orderClose.addEventListener('click', function () {
    modal.classList.remove('active')
})