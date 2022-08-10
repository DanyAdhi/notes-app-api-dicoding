const helloHandler = require('../handler/hello');
const noteHandler = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Hello home',
  },
  {
    method: 'GET',
    path: '/notes',
    handler: noteHandler.getAllNotes,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: noteHandler.getOneNotes,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: noteHandler.insertNote,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: noteHandler.updateNote,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: noteHandler.deleteNote,
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: helloHandler.heloUser,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak ditemukan',
  },
];

module.exports = routes;
