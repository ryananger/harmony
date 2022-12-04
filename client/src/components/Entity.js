var idCount = 0;

var Entity = function(x, y, methods) {
  const entity = {
    id: idCount + 1,
    x: x,
    y: y,
    images: [],
    currentImage: 0,
    methods: methods || {}
  };

  entity.methods = {
    ...methods,
    newImage: function(src, isAnimated, width, height, x, y) {
      var image = {
        element: new Image(),
        animated: isAnimated,
        width: width || null,
        height: height || width || null,
        x: x,
        y: y
      }

      image.element.src = src;

      entity.images.push(image);
    }
  }

  return entity;
}

export default Entity;

