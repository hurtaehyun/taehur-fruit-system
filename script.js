
const db = firebase.database();

document.getElementById("inputForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("inputName").value;
  const qty = parseFloat(document.getElementById("inputQuantity").value);
  const price = parseFloat(document.getElementById("inputPrice").value);
  const unitWeight = document.getElementById("inputUnitWeight").value;

  const [unitValue, unitType] = unitWeight.match(/([\d\.]+)(kg|과)/).slice(1, 3);
  const unit = parseFloat(unitValue);

  db.ref("inventory/" + name).once("value", snapshot => {
    let data = snapshot.val() || { total: 0 };
    data.total += qty * unit;
    db.ref("inventory/" + name).set(data);
  });

  alert("입고 완료");
});

document.getElementById("outputForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("outputName").value;
  const outQty = parseFloat(document.getElementById("outputQuantity").value);

  db.ref("inventory/" + name).once("value", snapshot => {
    let data = snapshot.val() || { total: 0 };
    data.total -= outQty;
    if (data.total < 0) data.total = 0;
    db.ref("inventory/" + name).set(data);
  });

  alert("출고 완료");
});

// 실시간 재고 반영
const inventoryList = document.getElementById("inventoryList");
db.ref("inventory").on("value", snapshot => {
  const data = snapshot.val() || {};
  inventoryList.innerHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value.total.toFixed(2)}`;
    inventoryList.appendChild(li);
  });
});
