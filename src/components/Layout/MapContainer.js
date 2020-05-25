import React from 'react';

class MapContainer extends React.Component {
  
  componentDidMount() {
    const onScriptLoad = () =>  {
      const map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        this.props.options);
      this.props.onMapLoad(map)
    }
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
     
      s.addEventListener('load', e => {
        onScriptLoad()
      })
    } else {
      onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: 400 }} id={this.props.id} />
    );
  }
}

export default MapContainer;