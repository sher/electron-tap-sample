'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_electron.remote.require(_path2.default.resolve(__dirname, '../browser/state-machine'));

var StateControl = function (_Component) {
  _inherits(StateControl, _Component);

  function StateControl(props) {
    _classCallCheck(this, StateControl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StateControl).call(this, props));

    _this.state = {
      switchState: _electron.ipcRenderer.sendSync('switch-state')
    };

    _this.changeSwitchState = _this.changeSwitchState.bind(_this);
    _this.setSwitchState = _this.setSwitchState.bind(_this);
    _electron.ipcRenderer.on('switch-response', _this.setSwitchState);
    return _this;
  }

  _createClass(StateControl, [{
    key: 'changeSwitchState',
    value: function changeSwitchState(event) {
      event.preventDefault();
      event.target.disabled = true;

      if (this.state.switchState == 'OFF') {
        _electron.ipcRenderer.send('switch-on');
      } else {
        this.setSwitchState(null, _electron.ipcRenderer.sendSync('switch-off'));
      }
    }
  }, {
    key: 'setSwitchState',
    value: function setSwitchState(sender, switchState) {
      this.setState({
        switchState: switchState
      });

      this.refs.button.disabled = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonText = this.state.switchState == 'OFF' ? 'Switch ON' : 'Switch OFF';
      var button = _react2.default.createElement(
        'button',
        { ref: 'button', onClick: this.changeSwitchState },
        buttonText
      );

      var style = {
        height: '60px'
      };

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'p',
          null,
          'State: ',
          this.state.switchState
        ),
        button
      );
    }
  }]);

  return StateControl;
}(_react.Component);

exports.default = StateControl;
//# sourceMappingURL=StateControl.js.map
