// const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORIES_URL = "http://localhost:4000/api/category";
const CATEGORY_INFO_URL = "http://localhost:4000/api/category/1234";
const PRODUCTS_URL = "http://localhost:4000/api/product";
const PRODUCT_INFO_URL = "http://localhost:4000/api/product/5678";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:4000/api/product/5678/comments";
const CART_URL = "http://localhost:4000/api/user/cart";
const CART_URL_DESAFIANTE = "http://localhost:4000/api/user/cart/d";
const BUY_ORDER_URL = "http://localhost:4000/api/user/order";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let auth2;
function init() {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init */
    auth2 = gapi.auth2.init({
      client_id: '422867937562-nj74vki2lis9eavkkgadbelm8uus6ndg.apps.googleusercontent.com'
      // client_id: '422867937562-5jfb3j6c6uqpnm5bpvhefvqj6dd347di.apps.googleusercontent.com' // LOCALHOST
    });
  });
}

async function logOut() {
  localStorage.removeItem('username');
  if(auth2) auth2.signOut().catch(err => console.log(err));
  location.replace('./index.html'); //Redireccione al home.html
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  let usuario = localStorage.getItem('username');

  if(!usuario) return logOut();

  document.getElementsByTagName('nav')[0]
  .innerHTML = `
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="btn-group" id="btnUsuario">
      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${usuario ? usuario.replace(',', ' ') : ''}
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" onclick="logOut()">Cerrar Sesion</a>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="navbarToggler"> 
      <ul class="navbar-nav container justify-content-around text-center"> 
        <li class="nav-item">
          <a class="nav-link" href="home.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="categories.html">Categorías</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.html">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sell.html">Vender</a>
        </li>
      </ul>
    </div>`
});

