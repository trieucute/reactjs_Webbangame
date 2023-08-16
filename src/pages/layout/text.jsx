import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// import './../../img.css'


const proprietes = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

const Text = () => {
    return (
        <div className="containerSlide">
            <Slide {...proprietes}>
                <div className="each-slide">
                    <div>
                        <img src="https://www.w3schools.com/howto/img_nature_wide.jpg"  alt="img1" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src="https://www.w3schools.com/howto/img_mountains_wide.jpg"  alt="img2" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src="https://www.w3schools.com/howto/img_woods_wide.jpg"alt="img3" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Text;