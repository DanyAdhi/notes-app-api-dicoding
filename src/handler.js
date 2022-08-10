const { nanoid } = require('nanoid');
const notes = require('./notes');

const getAllNotes = () => ({
  status: 'success',
  data: { notes },
});

const getOneNotes = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const note = notes[index];
  return {
    status: 'success',
    data: { note },
  };
};

const insertNote = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const payloadInsert = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.push(payloadInsert);
  const isSuccess = notes.filter((note) => note.id === id);

  if (!isSuccess) {
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditembahkan',
    });
    response.code(500);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: { noteId: id },
  });
  response.code(201);
  return response;
};

const updateNote = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toString();

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });

  response.code(200);
  return response;
};

const deleteNote = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  notes.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  getAllNotes, getOneNotes, insertNote, updateNote, deleteNote,
};
