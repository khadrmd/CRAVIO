module.exports = (template, object) => {
  let output = template.replace(/{%ID%}/g, object.id);
  output = output.replace(/{%IMAGE%}/g, object.image);
  output = output.replace(/{%NAME%}/g, object.name);
  output = output.replace(/{%TYPE%}/g, object.type);
  output = output.replace(/{%DIFFICULTY%}/g, object.difficulty);
  output = output.replace(/{%COST%}/g, object.cost);
  output = output.replace(/{%DESCRIPTION%}/g, object.description);

  return output;
};
