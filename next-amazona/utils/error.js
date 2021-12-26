import db from '../utils/db';

const getError = (err) =>
  err?.response?.data?.message ? err.response.data.message : err.message;

const onError = async (err, req, res) => {
  await db.disconnect();
  res.status(500).send({ message: err.toString() });
};
export { getError, onError };
