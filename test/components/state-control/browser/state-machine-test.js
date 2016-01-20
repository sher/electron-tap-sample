import test from 'tape';
import reporter from 'electron-tap/reporter';
import status from '../../../../src/components/state-control/browser/state-machine';

test('sample', function (t) {
  t.equal(status.state, 'OFF');
  t.end();
});
