var idCount = 0;

var Entity = function(name) {
  const entity = {
    name: name,
    id: idCount++,
    x: null,
    y: null,
    methods: null
  };

  return entity;
}

export default Entity;

