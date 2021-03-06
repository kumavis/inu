var test = require('tape')

var inu = require('../')
var pull = inu.pull

test('models returned by update are emitted by the model stream', function (t) {
  var initialModel = {initial: true}
  var expectedModel = {count: 0}
  var app = {
    init: function () {
      return {model: initialModel}
    },
    update: function (model, action) {
      return {model: expectedModel}
    },
    view: function (model, dispatch) {
      dispatch()
      return inu.html`<div></div>`
    }
  }
  var sources = inu.start(app)

  pull(sources.models(), pull.take(2), pull.collect(function (err, models) {
    t.error(err)
    t.equal(models[0], initialModel)
    t.equal(models[1], expectedModel)
    t.end()
  }))
})
