import React from 'react';
import './imagen.css';

const Imagen = ({imagen}) => {
    // console.log(imagen);
    const {largeImageURL,  likes, views, previewURL, tags} = imagen;

    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text">{likes} Me gustas</p>
                    <p className="card-text">{views} Vistas</p>
                </div>
                <div className="card-footer">
                    <a href={largeImageURL} rel="noopener noreferrer" target="_blank"  className="btn btn-primary btn-block">Ver imágen</a>
                </div>
            </div>
        </div>
     );
}
 
export default Imagen;