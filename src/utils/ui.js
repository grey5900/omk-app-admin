/**
 * Created by isaac on 16/2/26.
 */
import Alert from 'react-s-alert';
// import Audio from './audio';
import ReactDOM from 'react-dom';

export function disableEvent(event) {
  event.preventDefault();
  return false;
}

export function alertSuccess(msg) {
  Alert.success(msg, {
    position: 'top-right',
    effect: 'scale',
    timeout: 3000
  });
  // Audio.play('beep');
}

export function alertError(msg) {
  Alert.error(msg, {
    position: 'top-right',
    effect: 'scale',
    timeout: 3000
  });
  // Audio.play('beep');
}

export const modalStyles = {
  content: {
    width: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export function print(str) {
  const newWin = window.open('');
  newWin.document.write(str);
  newWin.print();
  newWin.close();
}

function addCSS(document, css) {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
  console.log('add css:', css, style);
}

export function printElement(element, css) {
  const newWin = window.open('');
  const doc = newWin.document;
  if (css) {
    addCSS(doc, css);
  }
  const node = doc.createElement('div');
  doc.body.appendChild(node);
  ReactDOM.render(element, node);
  newWin.print();
  newWin.close();
}
