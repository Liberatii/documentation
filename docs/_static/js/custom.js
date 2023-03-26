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
