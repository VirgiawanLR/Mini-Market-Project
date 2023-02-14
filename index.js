const categories = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

let products = [
  {
    id: 1675650294794,
    category: "Fast Food",
    name: "Noodle",
    price: 10000,
    stock: 4,
  },
  {
    id: 1675650294795,
    category: "Electronic",
    name: "Headphone",
    price: 90000,
    stock: 8,
  },
  {
    id: 1675650294796,
    category: "Cloth",
    name: "Hoodie",
    price: 100000,
    stock: 3,
  },
  {
    id: 1675650294797,
    category: "Fruit",
    name: "Apple",
    price: 20000,
    stock: 9,
  },
];

let cart = [];

const fnRenderProduk = (idTarget = 0) => {
  //rendering the products array-object into data table section
  const dataArr = products.map((product) => {
    const { id, category, name, price, stock } = product;
    let newProduct = "";
    if (id === idTarget) {
      newProduct += `
    <tr>
      <td>${id}</td>
      <td>${category}</td>
      <td><input type="text" value="${name}" name="editName"/></td>
      <td><input type="text" value="${price}" name="editPrice"/></td>
      <td><input type="text" value="${stock}" name="editStock"/></td>
      <td><input disabled type="button" value="Add" onclick="addToCart(${id})" /></td>
      <td><input type="button" value="Save" onclick="saveData(${id})" /></td>
      <td><input type="button" value="Cancel" onclick="cancel()" /></td>
    </tr>
    `;
    } else {
      newProduct += `
    <tr>
      <td>${id}</td>
      <td>${category}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td>${stock}</td>
      <td><input type="button" value="Add" onclick="addToCart(${id})" /></td>
      <td><input type="button" value="Delete" onclick="deleteData(${id})" /></td>
      <td><input type="button" value="Edit" onclick="editData(${id})" /></td>
    </tr>
    `;
    }
    return newProduct;
  });

  let dataTable = document.getElementById("body_table");
  let catInput = document.querySelector("select[name=category_input]");
  let catFiler = document.getElementById("category_filter");

  dataTable.innerHTML = dataArr.join("");

  //rendering "category" select tags
  const catArr = categories.map((category) => {
    let newCat = `
    <option value="${category}">${category}</option>
    `;
    return newCat;
  });

  catInput.innerHTML = catArr.join("");
  catFiler.innerHTML = catArr.join("");

  document.querySelector("input[name=name_input]").value = "";
  document.querySelector("input[name=price_input]").value = "";
  document.querySelector("input[name=stock_input]").value = "";

  //cart
  const cartArr = cart.map((product) => {
    let newDisplay = "";
    console.log("----------imhere--------------");
    let { id, category, name, price, qty } = product;
    newDisplay += `
    <tr>
      <td>${id}</td>
      <td>${category}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td>${qty}</td>
      <td><input type="button" value="Delete" onclick="deleteDataCart(${id})" /></td>
    </tr>
    `;
    return newDisplay;
  });
  let dataCart = document.getElementById("cart_table");

  dataCart.innerHTML = cartArr.join("");
};

const filterRender = (arr) => {
  //rendering the products array-object into data table section
  const dataArr = arr.map((product) => {
    const { id, category, name, price, stock } = product;
    let newProduct = `
    <tr>
      <td>${id}</td>
      <td>${category}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td>${stock}</td>
      <td><input type="button" value="Add" onclick="addToCart(${id})"/></td>
      <td><input type="button" value="Delete" onclick="deleteData(${id})" /></td>
      <td><input type="button" value="Edit" onclick="editData(${id})" /></td>
    </tr>
    `;
    return newProduct;
  });

  let dataTable = document.getElementById("body_table");

  dataTable.innerHTML = dataArr.join("");
};

const addToCart = (id) => {
  const result = products.find((product, index) => {
    if (product.id === id) {
      if (product.stock > 0) {
        product.stock -= 1;
      } else {
        return false;
      }
    }
    return product.id === id;
  });
  if (result) {
    let isHere = false;
    let index = 0;
    cart.forEach((product, idx) => {
      if (product.name === result.name) {
        isHere = true;
        index = idx;
      }
    });
    if (isHere) {
      cart[index].qty += 1;
    } else {
      let { id, category, name, price } = result;
      let newResult = { id, category, name, price, qty: 1 };
      cart.push(newResult);
    }
    fnRenderProduk();
  }
};

const deleteData = (id) => {
  products = products.filter((product) => {
    return !(product.id === id);
  });
  fnRenderProduk();
};

//masih salah
const deleteDataCart = (id) => {
  cart = cart.filter((product) => {
    if (product.id === id) {
      products.forEach((productAll) => {
        if (productAll.id === id) {
          productAll.stock += product.qty;
        }
      });
    }

    return !(product.id === id);
  });
  fnRenderProduk();
};

const editData = (id) => {
  fnRenderProduk(id);
};

const cancel = () => {
  fnRenderProduk();
};

const saveData = (id) => {
  let nameVal = document.querySelector("input[name=editName]").value;
  let priceVal = document.querySelector("input[name=editPrice]").value;
  let stockVal = document.querySelector("input[name=editStock]").value;
  products.forEach((product) => {
    if (product.id === id) {
      product.name = nameVal;
      product.price = parseInt(priceVal);
      product.stock = parseInt(stockVal);
    }
  });
  fnRenderProduk();
};

const inputData = () => {
  const now = new Date(),
    id = now.getTime();
  const name = document.querySelector("input[name=name_input]").value;
  const price = document.querySelector("input[name=price_input]").value;
  const category = document.querySelector("select[name=category_input]").value;
  const stock = document.querySelector("input[name=stock_input]").value;

  products.push({ id, name, price, category, stock });

  fnRenderProduk();
};

const filterName = () => {
  let keyword = document.getElementById("nameOfGood").value.toLowerCase();

  let resultFilter = products.filter((product) => {
    let productLower = product.name.toLowerCase();
    return productLower.includes(keyword);
  });
  filterRender(resultFilter);
};

const filterPrice = () => {
  let lowPrice = document.getElementById("low_price").value;
  let highPrice = document.getElementById("high_price").value;
  if (!(lowPrice === "" || highPrice === "")) {
    lowPrice = parseInt(lowPrice);
    highPrice = parseInt(highPrice);

    let resultFilter = products.filter((product) => {
      return product.price >= lowPrice && product.price <= highPrice;
    });
    filterRender(resultFilter);
  } else {
    fnRenderProduk();
  }
};

const filterCat = () => {
  let catVal = document.getElementById("category_filter").value;
  if (catVal === "All") {
    catVal = "";
  }
  let resultFilter = products.filter((product) => {
    let cat = product.category;
    return cat.includes(catVal);
  });
  filterRender(resultFilter);
};

const resetFilter = () => {
  document.getElementById("nameOfGood").value = "";
  document.getElementById("low_price").value = "";
  fnRenderProduk();
};

const transactionDetail = () => {
  if (cart) {
    let display = "";
    let sum = 0;
    cart.forEach((product) => {
      const { id, name, qty, price } = product;
      display += `<p>${id}| ${name}| qty:${qty}| price/item: Rp ${price.toLocaleString(
        "id-ID"
      )}| total: Rp ${(price * qty).toLocaleString("id-ID")}</p>`;
      sum += price * qty;
    });
    display += `<h3>Cart total price: Rp ${sum.toLocaleString("id-ID")}</h3>`;
    document.getElementById("cartDetail").innerHTML = display;
  }
};

fnRenderProduk();
