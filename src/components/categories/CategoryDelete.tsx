import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { deleteCategory } from "../../store/categories-actions";
import { CategoryParams } from "../../types";
import Modal from "../Modal";
import DeleteActions from "../UI/delete-actions/DeleteActions";

const CategoryDelete = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams<CategoryParams>();

    const deleteHandler = () => {
        if (params.id) dispatch(deleteCategory(parseInt(params.id)));
        navigate("/categories");
    };

    const renderActions: () => JSX.Element = () => {
        return (
            <DeleteActions
                routePath="/categories"
                deleteHandler={deleteHandler}
            />
        );
    };

    const renderContent = () => {
        return "Are you sure you want to delete this category?";
    };

    return (
        <div className="container">
            <Modal
                title="Delete Category"
                content={renderContent}
                actions={renderActions}
                onDismiss={() => navigate("/categories")}
            />
        </div>
    );
};

export default CategoryDelete;
