window.onload = firstPageProducts;

function firstPageProducts(){
    productList('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1');
};

function nextPageProducts(){
    var newUrl = document.getElementById('product-more-btn').dataset.nextlink;
    productList(`${newUrl}`);
};

function productList(url){
    const options ={
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`${url}`, options)
    .then(response=>{ response.json()
    .then( data => showProducts(data))
})
    .catch(e => console.log('Deu erro: ' +e, message))
};

function showProducts(result){
    result.products.forEach(function(entry) {
        let productCard = document.createElement("div");
        productCard.className = "product-card"; 

        let productCardIMG = document.createElement("div");
        productCardIMG.className = "product-card-img";
        productCardIMG.style.backgroundImage = `url(http:`+entry.image +`)`;
        productCard.appendChild(productCardIMG);

        let productCardCont = document.createElement("div");
        productCardCont.className = "product-card-content";
        productCard.appendChild(productCardCont);

        let productCardName = document.createElement("p");
        productCardName.className = "product-card-name";
        productCardName.innerHTML = entry.name;
        productCardCont.appendChild(productCardName);

        let productCardDesc = document.createElement("p");
        productCardDesc.className = "product-card-description";
        productCardDesc.innerHTML = entry.description;
        productCardCont.appendChild(productCardDesc);

        let productCardOldPrice = document.createElement("p");
        productCardOldPrice.className = "product-card-oldPrice";
        productCardOldPrice.innerHTML = "De: R$ "+entry.oldPrice.toFixed(2);
        productCardCont.appendChild(productCardOldPrice);

        let productCardPrice = document.createElement("p");
        productCardPrice.className = "product-card-price";
        productCardPrice.innerHTML = "Por: R$ "+entry.price.toFixed(2);
        productCardCont.appendChild(productCardPrice);

        let productCardInstallments = document.createElement("p");
        productCardInstallments.className = "product-card-installments";
        productCardInstallments.innerHTML = "ou "+entry.installments.count +"x de R$ "+entry.installments.value.toFixed(2);
        productCardCont.appendChild(productCardInstallments);

        let productCardBtnBuyA = document.createElement("a");
        let productCardBtnBuy = document.createElement("div");
        productCardBtnBuy.className = "product-card-buy";
        productCardBtnBuy.innerHTML = "Comprar";
        productCardBtnBuyA.appendChild(productCardBtnBuy);
        productCardCont.appendChild(productCardBtnBuyA);

        document.querySelector(".product-row").appendChild(productCard);
      });
    let btnMore = document.getElementById('product-more-btn');
    btnMore.setAttribute('data-nextlink', "https://"+result.nextPage );
    
}