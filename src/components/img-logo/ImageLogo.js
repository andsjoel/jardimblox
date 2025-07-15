import J from '../../assets/images/letters/J.svg';
import A from '../../assets/images/letters/A.svg';
import R from '../../assets/images/letters/R.svg';
import D from '../../assets/images/letters/D.svg';
import I from '../../assets/images/letters/I.svg';
import M from '../../assets/images/letters/M.svg';
import B from '../../assets/images/letters/B.svg';
import L from '../../assets/images/letters/L.svg';
import O from '../../assets/images/letters/O.svg';
import X from '../../assets/images/letters/X.svg';

import './image-logo.css';

const ImageLogo = () => {
    return (
        <div className='image-logo-container'>
            <img className='letter letter-J' src={J} alt='letra J' />
            <img className='letter letter-A' src={A} alt='letra A' />
            <img className='letter letter-R' src={R} alt='letra R' />
            <img className='letter letter-D' src={D} alt='letra D' />
            <img className='letter letter-I' src={I} alt='letra I' />
            <img className='letter letter-M' src={M} alt='letra M' />
            <img className='letter letter-B' src={B} alt='letra B' />
            <img className='letter letter-L' src={L} alt='letra L' />
            <img className='letter letter-O' src={O} alt='letra O' />
            <img className='letter letter-X' src={X} alt='letra X' />
        </div>
    );
}

export default ImageLogo;