let candidates = [];
let currentPage = 1;
const rowsPerPage = 10;
let sortField = 'id';
let sortAsc = true;

window.onload = fetchCandidates;

function fetchCandidates() {
  fetch('/api/candidates')
    .then(res => res.json())
    .then(data => {
      candidates = data;
      renderTable();
    });
}

function addCandidate() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!/^\d{10}$/.test(phone)) {
    showToast('Invalid phone number. Must be 10 digits.', 'danger');
    return;
  }

  fetch('/api/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone })
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to add');
    return res.json();
  })
  .then(() => {
    showToast('Candidate added!', 'success');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    fetchCandidates();
  })
  .catch(() => showToast('Error adding candidate.', 'danger'));
}

function deleteCandidate(id) {
  fetch(`/api/candidates/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error();
      showToast('Candidate deleted.', 'success');
      fetchCandidates();
    })
    .catch(() => showToast('Error deleting candidate.', 'danger'));
}

function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  let filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.email.toLowerCase().includes(search) ||
    (c.phone || '').includes(search)
  );

  filtered.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (typeof fieldA === 'string') return sortAsc ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    return sortAsc ? fieldA - fieldB : fieldB - fieldA;
  });

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  const body = document.getElementById('candidateBody');
  body.innerHTML = '';
  paginated.forEach(c => {
    body.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone || ''}</td>
        <td>
          <button class="btn btn-warning btn-sm" disabled>Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCandidate(${c.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  setupPagination(filtered.length);
}

function setupPagination(total) {
  const totalPages = Math.ceil(total / rowsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  renderTable();
}

function sortTable(field) {
  if (sortField === field) sortAsc = !sortAsc;
  else {
    sortField = field;
    sortAsc = true;
  }
  renderTable();
}

function exportCSV() {
  const rows = [['ID', 'Name', 'Email', 'Phone'], ...candidates.map(c => [c.id, c.name, c.email, c.phone || ''])];
  const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'candidates.csv';
  a.click();
}

function showToast(message, type) {
  const id = Date.now();
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.getElementById('toastContainer').appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(() => toast.remove(), 5000);
}

document.getElementById('searchInput').addEventListener('input', () => {
  currentPage = 1;
  renderTable();
});
