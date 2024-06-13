var m_img = document.querySelector('.m-img');
var imgArr=["./img/FotoSLIDE1.jpg","./img/FotoSLIDE2.jpg","./img/FotoSLIDE3.jpg"];
var num=0;
setInterval(() => {
  m_img.src=imgArr[num]
  num=(num+1)%imgArr.length
}, 3200);
// ARTICLE PRODUCT
// arrProduct
var sayNo = 1;
var sayNo2 = 1;
var icon = document.createElement('i');
var text = document.createElement('h4');
text.classList.add('spanad');
var articleBox = document.querySelector('.article');
var alrt = document.querySelector('.alrt');
function btnSearch() {
    var inpSearch = document.querySelector('.inp-search').value.trim().toUpperCase();
    var productFound = false;

    // Mevcut ürünleri temizle
    articleBox.innerHTML = '';

    for (let i = 0; i < arrProduct.brands.length; i++) {
        if (inpSearch === arrProduct.brands[i].ad.substring(0, inpSearch.length).toUpperCase()) {
            var newDiv = document.createElement('section');
            newDiv.classList.add('product-item');

            var mp_img = document.createElement('div');
            mp_img.classList.add('mp-img');
            newDiv.appendChild(mp_img);

            var img = document.createElement('img');
            img.classList.add('a-pro-img');
            img.src = arrProduct.brands[i].images;
            mp_img.appendChild(img);

            var product_name = document.createElement('div');
            product_name.classList.add('product-name');
            newDiv.appendChild(product_name);

            var text = document.createElement('span');
            text.classList.add('pro-name');
            text.textContent = arrProduct.brands[i].ad;
            product_name.appendChild(text);

            var section = document.createElement('div');
            section.classList.add('price');
            newDiv.appendChild(section);

            var qr = document.createElement('span');
            qr.classList.add('a-pro-price');
            qr.innerHTML = arrProduct.brands[i].ml;
            section.appendChild(qr);

            var addicon = document.createElement('div');
            addicon.classList.add('addicon');
            newDiv.appendChild(addicon);

            var icon = document.createElement('i');
            icon.classList.add('fa-solid');
            icon.classList.add('fa-plus');
            icon.classList.add('addI');
            addicon.appendChild(icon);

            icon.addEventListener('click', function () {
            document.querySelector('.productNo').innerHTML = sayNo2++;
            mbProNum.innerHTML = sayNo++;
                
            var clickedIcon = event.target;
            var productName = clickedIcon.parentElement.parentElement.querySelector('.pro-name');
            var productText = productName.innerText;
                
            var mbProductName = document.querySelector('.mbProductName');
            mbProductName.innerHTML += '<p>' + productText + '</p>';
                
            var productName2 = clickedIcon.parentElement.parentElement.querySelector('.pro-name');
            var productText2 = productName2.innerText;
                
            var mbProductName2 = document.querySelector('.bp_name');
            mbProductName2.innerHTML += '<p>' + productText2 + '</p>';
        });

            // Eşleşen ürünü ekle
            articleBox.appendChild(newDiv);

            productFound = true;
            break; // Sadece bir eşleşen ürün eklemek istediğimiz için döngüyü sonlandırabiliriz
        }
    }

    // Eğer hiç ürün bulunamazsa, uyarı göster
    if (!productFound) {
        alrt.style.display = 'block';
        setTimeout(() => {
            alrt.style.display = 'none';
        }, 3500);
    }
}
//helpBox
var inpFoc = document.querySelector('.inp-search');
var helpBox = document.querySelector('.helpBox');
inpFoc.addEventListener('input', () => { 
    var inpHelpVal = inpFoc.value.toUpperCase(); 
    helpBox.innerHTML = ''; 

    if (inpHelpVal.trim() === '') {
        helpBox.style.display = 'none';
        return;
    }

    arrProduct.brands.forEach(function(brand) {
        if (brand.ad.toUpperCase().startsWith(inpHelpVal)) {
            // Girilen değerle başlayan markaları bulun
            var helpSpan = document.createElement('span');
            helpSpan.classList.add('helpSpan');
            helpSpan.innerHTML = brand.ad;
            helpSpan.addEventListener('click', function() {
                // Seçeneğe tıklandığında, seçeneği input alanına ekleyin
                inpFoc.value = brand.ad;
                helpBox.style.display = 'none'; // Yardım kutusunu gizleyin
            });
            helpBox.appendChild(helpSpan);
        }
    });

    if (helpBox.children.length === 0) {
        // Eğer eşleşen marka yoksa, yardım kutusunu gizleyin
        helpBox.style.display = 'none';
    } else {
        helpBox.style.display = 'flex'; // Eşleşen markalar varsa, kutuyu gösterin
    }
});
// basket sebet
var b_produck = document.querySelector('.b-produck');
var bp_name = document.querySelector('.bp_name');
var btn_clear = document.querySelector('.btn-clear');
var h_basket = document.querySelector('.h-basket');
h_basket.addEventListener('click', function () {
    var inpSearch = document.querySelector('.inp-search').value;
    var deyer = inpSearch.toUpperCase();
    
        b_produck.style.display = 'flex';

    for (let i = 0; i < arrProduct.brands.length; i++) {
        if (deyer === arrProduct.brands[i].ad) {
            mbProNum.innerHTML=mbProNo++;
            var bp_box = document.createElement('p');
            bp_box.innerHTML = ' ' + arrProduct.brands[i].ad;
            bp_name.appendChild(bp_box);
        }
    }
});
//input
var FocusSearch = document.getElementById('focusSearch');
var input = document.querySelector('.inp-search');
var article = document.querySelector('.article');
var articleProduct = document.querySelector('.article-product');
FocusSearch.addEventListener('focus', function () {    
    article.style.display = 'flex';
    articleProduct.style.display = 'none';
});
FocusSearch.addEventListener('focusout', function () {    
    if (input.value==='') {
        article.style.display = 'none';
        articleProduct.style.display = 'flex';
    }else{
        article.style.display = 'flex';
        articleProduct.style.display = 'none';
    }
});
// article-product i
var swBoxList = document.querySelectorAll('.swBox');
var isVisible = false;
function showBox() {
    for (var i = 0; i < swBoxList.length; i++) {
        var swBox = swBoxList[i];
        if (isVisible) {
            swBox.style.display = 'none';
        } else {
            swBox.style.display = 'block';
        }
    }
    isVisible = !isVisible;
}
// mb footer
var mbProNum = document.querySelector('.mbBasketNo');
function BASS() {
    document.querySelector('.productNo').innerHTML = sayNo2++;
    mbProNum.innerHTML = sayNo++;

    var clickedIcon = event.target;
    var productName = clickedIcon.parentElement.parentElement.querySelector('.pro-name');
    var productText = productName.innerText;

    var mbProductName = document.querySelector('.mbProductName');
    mbProductName.innerHTML += '<p>' + productText + '</p>';

    var productName2 = clickedIcon.parentElement.parentElement.querySelector('.pro-name');
    var productText2 = productName2.innerText;

    var mbProductName2 = document.querySelector('.bp_name');
    mbProductName2.innerHTML += '<p>' + productText2 + '</p>';
    

}
// mb alert open cloce
var mbAlert=document.querySelector('.mbAlert');
function closeMbAlert(){
    mbAlert.style.display='none'
}
function openMbAlert(){
    mbAlert.style.display='flex'
}
function closeBPro() {
    b_produck.style.display='none'
}
function closeBars() {
    document.querySelector('.bars').style.display='none'
}
function openBars() {
    document.querySelector('.bars').style.display='flex'
}
// btn clear
btn_clear.addEventListener('click', function () {
    document.querySelector('.mbProductName').innerHTML=''
    document.querySelector('.bp_name').innerHTML=''

    while (bp_name.firstChild) {
        bp_name.removeChild(bp_name.firstChild);
    }
    document.querySelector('.productNo').innerHTML = sayNo2-sayNo2;
    document.querySelector('.mbBasketNo').innerHTML = 0;

    sayNo2=1;
});
var mbClear =document.querySelector('.mbClear');
mbClear.addEventListener('click', function(){

    var mbProNum = document.querySelector('.mbBasketNo');
    var mbProductName = document.querySelector('.mbProductName');
    
    mbProductName.innerHTML = '';

        mbProNum.innerText = sayNo-sayNo;

        sayNo=1;

})
var gif_alrt=document.querySelector('.gif-alrt');
var likeH=document.querySelector('.likeH');
var likeRed=false;
likeH.addEventListener('click', function () {
    if (!likeRed) {
        gif_alrt.style.display='block'
        likeH.style.color='gold'
    }
        setInterval(() => {
            gif_alrt.style.display='none'
        }, 3500);
 
    
})
var fotoArr = ["./img/slideBox1.jpeg", "./img/slideBox2.png", "./img/slideBox3.jpg"];
var img = document.querySelectorAll('.imgs');
var num = 0;
window.addEventListener('load', () => {
    img.forEach((element, index) => {
        element.src = fotoArr[index % fotoArr.length];
    });
    setInterval(() => {
        num = (num + 1) % fotoArr.length;
        img.forEach((element, index) => {
            element.src = fotoArr[(index + num) % fotoArr.length];
        });
    }, 7000);
});
