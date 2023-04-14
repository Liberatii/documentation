const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl), {
  trigger: 'focus'
})

function makeTablesResponsive() {
  // Get all table elements on the page
  const tables = document.getElementsByTagName('table');

  // Wrap each table in a div with the class 'responsive-table'
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const wrapper = document.createElement('div');
    wrapper.classList.add('responsive-table');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
}

makeTablesResponsive()


// Place the last-updated paragraph after the H1 tag
var header_1 = document.querySelector("h1:first-of-type");
var lu = document.querySelector("p.last-updated");
header_1.parentNode.insertBefore(lu, header_1.nextSibling);


function updateAnchors() {
  // Function to change header links to copy-link buttons
  const headers = document.querySelectorAll('a.headerlink');
  const locationHref = window.location.origin + window.location.pathname;

  headers.forEach(header => {
    const href = header.getAttribute('href');
    const newHref = locationHref + href;

    header.setAttribute('data-doc-href', newHref);
    header.setAttribute('title', "Copy link");
    let new_content = document.createElement("i");
	new_content.setAttribute("class", "fa-solid fa-chain");
    header.textContent = "";
    header.appendChild(new_content);

    header.addEventListener('click', event => {
      event.preventDefault();
      navigator.clipboard.writeText(newHref);
      const message = document.createElement("div");
      message.setAttribute("class", "link-copied")
      message.textContent = "Copied link to clipboard";
      document.body.appendChild(message);

      setTimeout(() => {
        document.body.removeChild(message);
      }, 3000);
    });
  });
}

updateAnchors()
