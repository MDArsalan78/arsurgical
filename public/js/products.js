fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById("productList");
    let selected = [];

    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.price}</p>
        <button onclick="add('${p.name}')">Add</button>
      `;
      box.appendChild(div);
    });

    window.add = (name) => {
      selected.push(name);
      alert(name + " added");
      window.order = () => {
        const msg = "Hi A R Surgical, I want: " + selected.join(", ");
        window.open("https://wa.me/918052773069?text=" + encodeURIComponent(msg));
      };
    };
  });
