import { Link } from "react-router-dom";
import "./CustomButtons.css";

const ButtonChart: React.FC<{
    routePath: string;
    text: string;
    buttonClass: string;
}> = ({ routePath, text, buttonClass }) => {
    return (
        <div className="col-2">
            <Link to={routePath}>
                <button className={`btn ${buttonClass}`}>{text}</button>
            </Link>
        </div>
    );
};

export default ButtonChart;
