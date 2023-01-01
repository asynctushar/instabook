import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const { isLoading, isAuthenticated } = useSelector((state) => state.userState);

    return (
        <Fragment>
            {!isLoading && isAuthenticated && children}
            {!isLoading && !isAuthenticated && <Navigate to="/login" />}
        </Fragment>
    )
}

export default ProtectedRoute;