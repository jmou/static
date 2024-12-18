function highlight(oid, className) {
  for (const elem of document.querySelectorAll(`.${className}`)) {
    elem.classList.remove(className);
  }
  if (!oid) return;
  for (const elem of document.querySelectorAll(`[data-oid="${oid}"], [data-inert-oid="${oid}"]`)) {
    elem.classList.add(className);
  }
}

function select(oid) {
  htmx.ajax("GET", `details/${oid}`, "#details");
  highlight(oid, "details");
}

function onclick(event) { select(event.currentTarget.dataset.oid); }
function onmouseenter(event) { highlight(event.currentTarget.dataset.oid, "hover"); }
function onmouseleave(event) { highlight(null, "hover"); }

for (const elem of document.querySelectorAll("#objects .node")) {
  elem.dataset.oid = elem.id;
}
for (const elem of document.querySelectorAll("[data-oid]")) {
  elem.onclick = onclick;
  elem.onmouseenter = onmouseenter;
  elem.onmouseleave = onmouseleave;
}
