const API = "http://localhost:5000/api/pizzas";

let editId = null;

// PRICE CALCULATOR
function calculatePrice(size, crust, toppings, quantity) {
  let basePrice = 300;

  // SIZE PRICE
  if (size === "Medium") {
    basePrice += 100;
  }

  if (size === "Large") {
    basePrice += 200;
  }

  // CRUST PRICE
  if (crust === "Cheese Burst") {
    basePrice += 150;
  }

  if (crust === "Thin Crust") {
    basePrice += 50;
  }

  if (crust === "Stuffed Crust") {
    basePrice += 180;
  }

  if (crust === "Garlic Crust") {
    basePrice += 90;
  }

  if (crust === "Italian Crust") {
    basePrice += 120;
  }

  // TOPPINGS PRICE
  toppings.forEach((top) => {
    const t = top.trim().toLowerCase();

    if (t === "extra cheese") {
      basePrice += 50;
    }

    if (t === "paneer") {
      basePrice += 70;
    }

    if (t === "mushroom") {
      basePrice += 40;
    }

    if (t === "black olives") {
      basePrice += 60;
    }

    if (t === "corn") {
      basePrice += 30;
    }

    if (t === "onion") {
      basePrice += 20;
    }

    if (t === "capsicum") {
      basePrice += 25;
    }

    if (t === "jalapeno") {
      basePrice += 45;
    }

    if (t === "tomato") {
      basePrice += 20;
    }

    if (t === "chicken") {
      basePrice += 100;
    }

    if (t === "pepperoni") {
      basePrice += 120;
    }

    if (t === "korean toppings") {
      basePrice += 80;
    }

    if (t === "sausage") {
      basePrice += 110;
    }

    if (t === "bacon") {
      basePrice += 130;
    }

    if (t === "pineapple") {
      basePrice += 60;
    }
  });

  return {
    basePrice,

    totalPrice: basePrice * quantity,
  };
}

// LOAD CART
async function loadCart() {
  const res = await fetch(API);

  const pizzas = await res.json();

  const cart = document.getElementById("cart");

  cart.innerHTML = "";

  pizzas.forEach((pizza) => {
    cart.innerHTML += `

      <div class="pizza-card">

        <h3>${pizza.pizzaName}</h3>

        <p>
          <b>Customer:</b>
          ${pizza.customerName}
        </p>

        <p>
          <b>Size:</b>
          ${pizza.size}
        </p>

        <p>
          <b>Crust:</b>
          ${pizza.crust}
        </p>

        <p>
          <b>Toppings:</b>
          ${pizza.toppings.join(", ")}
        </p>

        <p>
          <b>Quantity:</b>
          ${pizza.quantity}
        </p>

        <p>
          <b>Base Price:</b>
          ₹${pizza.basePrice}
        </p>

        <p>
          <b>Total Price:</b>
          ₹${pizza.totalPrice}
        </p>

        <button onclick="editPizza('${pizza._id}')">
          Edit
        </button>

        <button onclick="deletePizza('${pizza._id}')">
          Delete
        </button>

      </div>

    `;
  });
}

// ADD OR UPDATE PIZZA
async function addPizza() {
  const toppingsSelect = document.getElementById("toppings");

  const toppingsArray = Array.from(toppingsSelect.selectedOptions).map(
    (option) => option.value,
  );

  const size = document.getElementById("size").value;

  const crust = document.getElementById("crust").value;

  const quantity = Number(document.getElementById("quantity").value);

  const pricing = calculatePrice(size, crust, toppingsArray, quantity);

  const pizza = {
    customerName: document.getElementById("customerName").value,

    pizzaName: document.getElementById("pizzaName").value,

    size: size,

    crust: crust,

    toppings: toppingsArray,

    quantity: quantity,

    basePrice: pricing.basePrice,

    totalPrice: pricing.totalPrice,
  };

  // UPDATE
  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(pizza),
    });

    editId = null;
  }

  // CREATE
  else {
    await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(pizza),
    });
  }

  clearForm();

  loadCart();
}

// EDIT PIZZA
async function editPizza(id) {
  const res = await fetch(API);

  const pizzas = await res.json();

  const pizza = pizzas.find((p) => p._id === id);

  document.getElementById("customerName").value = pizza.customerName;

  document.getElementById("pizzaName").value = pizza.pizzaName;

  document.getElementById("size").value = pizza.size;

  document.getElementById("crust").value = pizza.crust;

  document.getElementById("quantity").value = pizza.quantity;

  // MULTI SELECT TOPPINGS
  const toppingsSelect = document.getElementById("toppings");

  Array.from(toppingsSelect.options).forEach((option) => {
    option.selected = pizza.toppings.includes(option.value);
  });

  editId = id;
}

// DELETE PIZZA
async function deletePizza(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  loadCart();
}

// CLEAR FORM
function clearForm() {
  document.getElementById("customerName").value = "";

  document.getElementById("pizzaName").value = "Cheese Pizza";

  document.getElementById("size").value = "Small";

  document.getElementById("crust").value = "Normal Crust";

  document.getElementById("quantity").value = "";

  const toppingsSelect = document.getElementById("toppings");

  Array.from(toppingsSelect.options).forEach((option) => {
    option.selected = false;
  });
}

// INITIAL LOAD
loadCart();
