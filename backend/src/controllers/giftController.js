const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { rows: gifts } = await configDb
  .query('SELECT * FROM gifts ORDER BY product ASC');

  return res.json(gifts);
}

exports.create = async (req, res) => {
  const { product, eventid } = req.body;

  try {
    const response = await configDb
    .query(
      'INSERT INTO gifts (product, eventid) VALUES($1, $2)',
      [product, eventid]
    );

    return res.json({
      success: `${product} succescully added to list`,
    });
  }
  catch(e) {
    return(res.json({
      e,
    }));
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  const response = await configDb
  .query('DELETE FROM gifts where id = $1', [id]);

  const invitedResponse = await configDb
  .query('UPDATE inviteds SET giftid = 0 WHERE giftid = $1', [id]);

  return res.json({
    success: 'Gift successfully removed from the list.'
  })
}
