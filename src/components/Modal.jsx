

import ReactDom from 'react-dom';

export default function Modal(props) {
    const { handleCloseModal, children } = props;
    return ReactDom.createPortal(
        <div className='modal-container'>
            <div className='modal-box'>
            <button onClick={handleCloseModal} className='modal-undelay'><i class="fa-solid fa-xmark"></i></button>
            <div className='modal'>
                {children}
            </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}