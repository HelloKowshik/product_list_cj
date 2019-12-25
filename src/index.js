let filterInput = document.querySelector('#filter');
let deleteBtn = document.querySelector('.delete-btn');
let productInput = document.querySelector('.product-name');
let priceInput = document.querySelector('.product-price');
let addBtn = document.querySelector('.add-product');
let productListUL = document.querySelector('.collection');
let msg = document.querySelector('.msg');

let productData = [];

function getData(productList){
    if(productData.length>0){
        msg.innerHTML = '';
        let li = '';
    productList.forEach(product => {
        let {id,name,price} = product;
        li = document.createElement('li');
        li.className = 'list-group-item collection-item';
        li.id = `product-${id}`;
        li.innerHTML = `<strong>${name}</strong>-BDT-
        <span class="price">${price}</span>
        <i class="fas fa-trash float-right delete-btn"></i>`;
        productListUL.appendChild(li);
    });
    }else{
        msg.innerHTML = 'No Product Available!';
    }
}
getData(productData);

function addProduct(e){
  e.preventDefault();
  let name = productInput.value;
  let price = priceInput.value;
  let id;
  if(productData.length === 0){
      id = 0;
  }else{
      id = productData[productData.length - 1].id + 1;
  }
  if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
      alert('All Fields Are Mandatory!');
  }else{
      productData.push({
          id,name,price
      });
      productListUL.innerHTML = '';
      getData(productData);
      productInput.value = '';
      priceInput.value = '';
  }
}

function deleteBtnFunc(e){
  if(e.target.classList.contains('delete-btn')){
    let targetElement = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(targetElement);
    let id = parseInt(targetElement.id.split('-')[1]);
    let result = productData.filter(product=>{
      return product.id !== id
  });
  productData = result;
  console.log(result);
  }
}
function filterInputFunc(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection .collection-item').forEach(product=>{
        let productName = product.firstElementChild.textContent.toLowerCase();
        if(productName.indexOf(text) === -1){
            msg.innerHTML = 'No items Found!'
            product.style.display = 'none';
        }else{
            product.style.display = 'block';
            msg.innerHTML = '';
        }
      })
    }
function loadEvents(){
    addBtn.addEventListener('click',addProduct);
    filterInput.addEventListener('keyup',filterInputFunc);
    productListUL.addEventListener('click',deleteBtnFunc);
}
loadEvents();