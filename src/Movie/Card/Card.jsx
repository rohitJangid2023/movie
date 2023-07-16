import React from 'react'
import './Card.css'

function Card() {
    

    return (
        <div>
            <div className="container py-5">
                <div className="py-5">

                    <div className="row">
                    
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <div className="hover hover-2 text-white rounded"><img src="https://bootstrapious.com/i/snippets/sn-img-hover/hoverSet-2.jpg" alt="" />
                                <div className="hover-overlay"></div>
                                <div className="hover-2-content px-5 py-4">
                                    <h3 className="hover-2-title text-uppercase font-weight-bold mb-0"> <span className="font-weight-light">Image </span>Caption</h3>
                                    <p className="hover-2-description text-uppercase mb-0">Lorem ipsum dolor sit amet, consectetur <br />adipisicing elit.</p>
                                </div>
                            </div>
                        </div>

                    

                    </div>
                </div>



            </div>
        </div>
    )
}

export default Card