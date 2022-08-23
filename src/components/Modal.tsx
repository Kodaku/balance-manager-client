import { MouseEventHandler } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    title: string;
    content: () => string;
    actions: () => JSX.Element;
    onDismiss: MouseEventHandler;
};

const Modal: React.FC<ModalProps> = (props) => {
    const modalStyle = {
        display: "block",
        backgroundColor: "rgba(0,0,0,0.8)",
    };
    return ReactDOM.createPortal(
        <div
            className="modal show fade"
            style={modalStyle}
            onClick={props.onDismiss}
        >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={props.onDismiss}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{props.content()}</p>
                    </div>
                    <div className="modal-footer">{props.actions()}</div>
                </div>
            </div>
        </div>,
        document.querySelector("#modal") as HTMLElement
    );
};

export default Modal;
