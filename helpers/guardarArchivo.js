const fs = require("fs");

const archivo = "./db/data.json";

const guardarBD = (data) => {
  data = JSON.stringify(data);
  fs.writeFileSync(archivo, data);
};

const leerBD = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { ecoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
};

module.exports = {
  guardarBD,
  leerBD,
};
