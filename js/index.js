//use fetch to send data to server with event listener and content-type application/x-www-form-urlencoded
const getDataMahasiswa = async function () {
  const response = await fetch('http://localhost:3000/mahasiswa')
  const { message, data } = await response.json()
  let listData = ''
  data.forEach(mahasiswa => {
    listData += /*html*/ `
      <ul data-id="${mahasiswa.nim}">
        <li>nim: ${mahasiswa.nim}</li>
        <li>nama: ${mahasiswa.nama}</li>
        <li>jurusan: ${mahasiswa.jurusan.nama_jurusan}</li>
        <li>alamat: ${mahasiswa.alamat}</li>
        <li>angkatan: ${mahasiswa.angkatan}</li>
        <button>edit</button>
        <button>delete</button>
      </ul>
    `
  })
  document.querySelector('#data-mahasiswa').innerHTML = listData
  document.querySelector('.message').innerHTML = message
}
const createDataMahasiswa = async function (e) {
  e.preventDefault()
  const res = await fetch('http://localhost:3000/mahasiswa', {
    method: 'POST',
    body: new FormData(this)
  })
  const data = await res.json()
  document.querySelector('#response').innerHTML = data.message
  getDataMahasiswa()
}
const updateDataMahasiswa = function (e) {
  const parent = e.target.parentElement
  const action = e.target.innerText
  console.log(action, parent)
  if (action === 'delete' || action === 'edit') {
    fetch(`http://localhost:3000/mahasiswa/${parent.dataset.id}`, {
      method: action === 'delete' ? 'DELETE' : action === 'edit' && 'PUT',
      body: action === 'delete' ? null : new FormData(document.querySelector('form'))
    })
      .then(res => res.json())
      .then(result => {
        getDataMahasiswa()
        document.querySelector('#response').innerHTML = result.message
      })
  }
}
document.querySelector('form').addEventListener('submit', createDataMahasiswa)
document.querySelector('button').addEventListener('click', getDataMahasiswa)
document.querySelector('#data-mahasiswa').addEventListener('click', updateDataMahasiswa)
