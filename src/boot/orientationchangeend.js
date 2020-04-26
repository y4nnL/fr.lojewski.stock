import OCE from 'orientationchangeend';

export default () => {
  let oceEvent = new CustomEvent('orientationchangeend');
  window.onorientationchangeend = OCE().on('orientationchangeend', () => window.dispatchEvent(oceEvent));
}
