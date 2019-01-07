/**
 * Created by isaac on 16/5/9.
 */
import React, {Component, PropTypes} from 'react';

const lightboxStyle = {
  opacity: 1,
  /** Position and style */
  position: 'fixed',
  zIndex: 999,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  top: 0,
  left: 0,
  background: 'rgba(0,0,0,0.88)',
  visibility: 'visible',
  transition: 'all .5s '
};

const lightboxImageStyle = {
  padding: '20px',
  maxWidth: '100%',
  maxHeight: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset'
};

const hideStyle = {
  opacity: 0,
  visibility: 'hidden',
  transition: 'visibility .3s, opacity .3s linear'
};

export default
class LightBox extends Component {
  static propTypes = {
    show: PropTypes.bool,
    url: PropTypes.string
  };

  render() {
    const {show, url, ...rest} = this.props;
    const style = {...lightboxStyle};
    if (!show) {
      Object.assign(style, hideStyle);
    }
    return (<div style={style} {...rest} >
      <img style={lightboxImageStyle} src={url} />
    </div>);
  }
}
