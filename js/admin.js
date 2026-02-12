function loadProducts() {
  fetch("/api/products")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("adminList");
      list.innerHTML = "";
      data.forEach(p => {
        list.innerHTML += `
          <div>
            ${p.name}
            <button onclick="del('${p.id}')">❌</button>
          </div>
        `;
      });
    });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  }).then(loadProducts);
}

function del(id) {
  fetch("/api/products/" + id, { method: "DELETE" })
    .then(loadProducts);
}

loadProducts();
