import React from 'react';

const GoogleMap = (props) => (
    <div>
        <div>
            <iframe title="googleMap" width="500" height="300" id="gmap_canvas" src={`https://maps.google.com/maps?q=${props.data}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
            </iframe>
        </div>
    </div>
)

export default GoogleMap;