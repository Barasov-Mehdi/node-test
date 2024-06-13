var m_img = document.querySelector('.m-img');
var imgArr = ["./img/FotoSLIDE1.jpg", "./img/FotoSLIDE2.jpg", "./img/FotoSLIDE3.jpg"];
var num = 0;
setInterval(() => {
    m_img.src = imgArr[num];
    num = (num + 1) % imgArr.length;
}, 3200);

var inp_search = document.querySelector('.inp-search');
var article = document.querySelector('.article');
var price_box = document.querySelectorAll('.price_box');
var totalprice = 0;
function btnSearch() {
    var input = inp_search.value.trim().toUpperCase();

    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            while (article.firstChild) {
                article.removeChild(article.firstChild);
            }
            data.forEach(e => {
                if (e.name.toUpperCase().includes(input)) {
                    var cardHTML = `
                    <div class="col-6 col-sm-6 col-md-3 mb-4 col-6-custom">
                        <div class="card custom-card h-100">
                            <img src="/uploads/${e.img}" class="card-img-top" alt="${e.name}">
                            <div class="card-body">
                                <h5 class="card-title">${e.name}</h5>
                                <p class="card-text priceText">Qiymət ${e.price}₼</p>
                                <span class="card-date">${new Date(e.date).toLocaleString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    })}</span>
                                <button class="btn btn-cart addcard">
                                    <i class="fas fa-shopping-cart"></i> Səbətə At
                                </button>
                            </div>
                        </div>
                    </div>`;
                    article.innerHTML += cardHTML;
                }
            });

            var bp_name = document.querySelectorAll('.bp_name');
            var addCardButtons = document.querySelectorAll('.addcard');

            function addCardFunctionality() {
                addCardButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        var productCard = button.closest('.col-6-custom');
                        var productContent = productCard.innerHTML;

                        bp_name.forEach(e => {
                            e.innerHTML += `<div class="col mb-4 col-6-custom">${productContent}</div>`;
                        });

                        var priceElement = productCard.querySelector('.priceText');
                        var priceTextContent = priceElement.textContent.trim();
                        var price = parseInt(priceTextContent.match(/\d+/)[0]);

                        totalprice += price;

                        price_box.forEach(addPri => {
                            addPri.textContent = totalprice.toFixed(2) + '₼';
                        });
                    });
                });
            }

            addCardFunctionality();
        })
        .catch(error => {
            console.error('Ürünler alınırken hata oluştu', error);
        });
}

document.querySelector('.btn-search').addEventListener('click', btnSearch);

var helpBox = document.querySelector('.helpBox');
inp_search.addEventListener('input', () => {
    var inpHelpVal = inp_search.value.toUpperCase();
    helpBox.innerHTML = '';

    if (inpHelpVal.trim() === '') {
        helpBox.style.display = 'none';
        return;
    }

    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                if (e.name.toUpperCase().startsWith(inpHelpVal)) {
                    var helpSpan = document.createElement('span');
                    helpSpan.classList.add('helpSpan');
                    helpSpan.innerHTML = e.name;
                    helpSpan.addEventListener('click', function () {
                        inp_search.value = e.name;
                        helpBox.style.display = 'none';
                    });
                    helpBox.appendChild(helpSpan);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });

    if (helpBox.children.length === 0) {
        helpBox.style.display = 'none';
    } else {
        helpBox.style.display = 'flex';
    }
});

var bp_name = document.querySelectorAll('.bp_name');
var addCardButtons = document.querySelectorAll('.addcard');
var price_box = document.querySelectorAll('.price_box');
var totalprice = 0;

function addCardFunctionality() {
    addCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            var productCard = button.closest('.col-6-custom');
            var productContent = productCard.innerHTML;

            bp_name.forEach(e => {
                e.innerHTML += `<div class="col mb-4 col-6-custom">${productContent}</div>`;
            });

            var priceElement = productCard.querySelector('.priceText');
            var priceTextContent = priceElement.textContent.trim();
            var price = parseInt(priceTextContent.match(/\d+/)[0]);
            totalprice += price;

            price_box.forEach(addPri => {
                addPri.textContent = totalprice.toFixed(1) + '₼';
            });
        });
    });
}
addCardFunctionality();

function clearCard() {
    
}
clearCard();



var mbAlert = document.querySelector('.mbAlert');
var h_basket = document.querySelector('.h-basket');
var b_produck = document.querySelector('.b-produck');

function closeMbAlert() {
    mbAlert.style.display = 'none';
}

function openMbAlert() {
    mbAlert.style.display = 'flex';
}

function closeBPro() {
    b_produck.style.display = 'none';
}

function closeBars() {
    document.querySelector('.bars').style.display = 'none';
}

function openBars() {
    document.querySelector('.bars').style.display = 'flex';
}

function openhBasket() {
    document.querySelector('.b-produck').style.display = 'flex';
}
