const heloUser = (req) => {
  const name = (req.params.name ? req.params.name : 'Stranger');
  return `Hello ${name}`;
};

module.exports = { heloUser };
