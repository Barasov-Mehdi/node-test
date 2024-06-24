var m_img = document.querySelector('.m-img');
var imgArr = ["./img/FotoSLIDE1.jpg", "./img/FotoSLIDE2.jpg", "./img/FotoSLIDE3.jpg"];
var num = 0;
setInterval(() => {
    m_img.src = imgArr[num];
    num = (num + 1) % imgArr.length;
}, 3200);
var proCurrent = 0;
var ProductCount = 0;
var productNo = document.querySelectorAll('.productNo');
var inp_search = document.querySelector('.inp-search');
var article = document.querySelector('.article');
var price_box = document.querySelectorAll('.price_box');
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
                <div class="col-12 col-sm-12 col-md-3 mb-4 col-12-custom mycard">
                    <div class="card custom-card h-100">
                        <img src="${e.img}" class="card-img-top" alt="${e.name}">
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text priceText">Qiymət: ${e.price}₼</p>
                            <p class="card-text product-content" data-full-text="${e.content || ''}">
                                ${e.content && e.content.length > 40 ? e.content.substring(0, 40) + '...' : e.content || ''}
                            </p>
                            ${e.content && e.content.length > 40 ? '<button class="btn btn-link read-more" onclick="toggleContent(this)">Oxu</button>' : ''}
                            <span class="card-date">
                                ${new Date(e.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                            </span>
                            <button class="btn btn-cart addcard">
                                <i class="fas fa-shopping-cart"></i> Səbətə At
                            </button>
                        </div>
                    </div>
                </div>`;
                    article.innerHTML += cardHTML;
                }
            });

            function addCardFunctionality() {
                var addCardButtons = document.querySelectorAll('.addcard');
                addCardButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        var productCard = button.closest('.col-12-custom');
                        var productContent = productCard.innerHTML;
            
                        var priceElement = productCard.querySelector('.priceText');
                        var priceTextContent = priceElement.textContent.trim();
                        var price = parseFloat(priceTextContent.match(/(\d+(\.\d+)?)/));
                        // match(/\d+/)[0]
                        if (cartIsEmpty) {
                            proCurrent = price;
                            cartIsEmpty = false;
                        } else {
                            proCurrent += price;
                        }
            
                        document.querySelectorAll('.price_box').forEach(priceBox => {
                            priceBox.textContent = proCurrent.toFixed(1) + '₼';
                        });
            
                        document.querySelectorAll('.bp_name').forEach(bpName => {
                            bpName.innerHTML += `<div class="col mb-4 col-12-custom">${productContent}</div>`;
                        });
                        ProductCount++;
                        productNo.forEach(ProCount => {
                            ProCount.textContent = ProductCount;
                        })
            
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
let debounceTimeout;
const debounceDelay = 300;
function debounceFetch() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(fetchProducts, debounceDelay);
}
function fetchProducts() {
    var inpHelpVal = inp_search.value.trim().toUpperCase();
    helpBox.innerHTML = '';

    if (inpHelpVal === '') {
        helpBox.style.display = 'none';
        return;
    }

    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            console.log('Fetched products:', data);
            const uniqueProducts = new Set();

            data.forEach(product => {
                const productName = product.name.toUpperCase();
                if (productName.startsWith(inpHelpVal) && !uniqueProducts.has(productName)) {
                    uniqueProducts.add(productName);

                    var helpSpan = document.createElement('span');
                    helpSpan.classList.add('helpSpan');
                    helpSpan.textContent = product.name;
                    helpSpan.addEventListener('click', function () {
                        inp_search.value = product.name;
                        helpBox.style.display = 'none';
                    });
                    helpBox.appendChild(helpSpan);
                }
            });

            if (helpBox.children.length === 0) {
                helpBox.style.display = 'none';
            } else {
                helpBox.style.display = 'flex';
            }
        })
        .catch(err => {
            console.error('Error fetching products:', err);
        });
}
inp_search.addEventListener('input', debounceFetch);

function bodyToucy() {
    var reloadPro = document.querySelectorAll('.reloadPro');

    reloadPro.forEach(e => {
        e.addEventListener('click', () => {
            fetch('/api/products')
                .then(response => response.json())
                .then(data => {
                    var article = document.querySelector('.article'); // Assuming you have an element with class 'article' where products will be displayed
                    article.innerHTML = ''; // Clear previous content
                    console.log('SALAM ALEYKUM')

                    data.forEach(e => {
                        var cardHTML = `
                    <div class="col-12 col-sm-12 col-md-4 mb-4 col-12-custom mycard">
                        <div class="card custom-card h-100">
                            <img src="${e.img}" class="card-img-top" alt="${e.name}">
                            <div class="card-body">
                                <h5 class="card-title">${e.name}</h5>
                                <p class="card-text priceText">Qiymət: ${e.price}₼</p>
                                <p class="card-text product-content" data-full-text="${e.content || ''}">
                                    ${e.content && e.content.length > 40 ? e.content.substring(0, 40) + '...' : e.content || ''}
                                </p>
                                ${e.content && e.content.length > 40 ? '<button class="btn btn-link read-more" onclick="toggleContent(this)">Oxu</button>' : ''}
                                <span class="card-date">
                                    ${new Date(e.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                                </span>
                                <button class="btn btn-cart addcard">
                                    <i class="fas fa-shopping-cart"></i> Səbətə At
                                </button>
                            </div>
                        </div>
                    </div>`;
                        article.innerHTML += cardHTML;
                    });

                    addCardFunctionality();
                })
                .catch(error => {
                    console.error('Ürünler alınırken hata oluştu', error);
                });
        })
    })
}
bodyToucy()

var bp_name = document.querySelectorAll('.bp_name');
var addCardButtons = document.querySelectorAll('.addcard');
var cartIsEmpty = true;

function addCardFunctionality() {
    var addCardButtons = document.querySelectorAll('.addcard');
    addCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            var productCard = button.closest('.col-12-custom');
            var productContent = productCard.innerHTML;

            var priceElement = productCard.querySelector('.priceText');
            var priceTextContent = priceElement.textContent.trim();
            var price = parseFloat(priceTextContent.match(/(\d+(\.\d+)?)/));
            // match(/\d+/)[0]
            if (cartIsEmpty) {
                proCurrent = price;
                cartIsEmpty = false;
            } else {
                proCurrent += price;
            }

            document.querySelectorAll('.price_box').forEach(priceBox => {
                priceBox.textContent = proCurrent.toFixed(1) + '₼';
            });

            document.querySelectorAll('.bp_name').forEach(bpName => {
                bpName.innerHTML += `<div class="col mb-4 col-12-custom">${productContent}</div>`;
            });
            ProductCount++;
            productNo.forEach(ProCount => {
                ProCount.textContent = ProductCount;
            })

        });
    });
}
addCardFunctionality();

function clearCard() {
    var btn_clear = document.querySelectorAll('.btn-clear');
    btn_clear.forEach(btnC => {
        btnC.addEventListener('click', () => {
            document.querySelectorAll('.bp_name').forEach(bpName => {
                bpName.innerHTML = '';
            });

            proCurrent = 0;
            cartIsEmpty = true;

            document.querySelectorAll('.price_box').forEach(priceBox => {
                priceBox.textContent = '0₼';
            });
            productNo.forEach(ProCount => {
                ProCount.textContent = ProductCount;
                ProductCount = 0
            })
        });
    });
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
var gif_alrt = document.querySelector('.gif-alrt');
var likeH = document.querySelector('.likeH');
var likeRed = false;
likeH.addEventListener('click', function () {
    if (!likeRed) {
        gif_alrt.style.display = 'block'
        likeH.style.color = 'gold'
    }
    setInterval(() => {
        gif_alrt.style.display = 'none'
    }, 3500);


})
function toggleContent(button) {
    const cardBody = button.parentElement;
    const contentPara = cardBody.querySelector('.product-content');
    const fullText = contentPara.getAttribute('data-full-text');

    if (button.textContent === 'Oxu') {
        contentPara.textContent = fullText;
        button.textContent = 'Bağla';
    } else {
        contentPara.textContent = fullText.substring(0, 40) + '...';
        button.textContent = 'Oxu';
    }
}