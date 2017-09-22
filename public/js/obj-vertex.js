// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

(function() {
  AFRAME.registerComponent('obj-vertex', {
    schema: { type: 'string' },
    init: function () {
      this.model = null;
      this.objLoader = new THREE.OBJVertexColorLoader();
    },
    update: function () {
      var data = this.data;
      this.remove();
      this.loadObj(data);
    },
    remove: function () {
      if (!this.model) { return; }
      this.el.removeObject3D('mesh');
    },
    loadObj: function (objUrl) {
      var self = this;
      var el = this.el;
      var objLoader = this.objLoader;
      objLoader.load(objUrl, function (objModel) {
        self.model = objModel;
        el.setObject3D('mesh', objModel);
        el.emit('model-loaded', {format: 'obj', model: objModel});
      });
    }
  });
})();
