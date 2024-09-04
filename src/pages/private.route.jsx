import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        );
    }

    // return (<Navigate to="/login" replace />);

    return (
        <Result
            status="403"
            title="Unauthorized!"
            subTitle={"You are not authorized to access this page!"}
            extra={<Button type="primary">
                <Link to="/">
                    <span>Back to Home</span>
                </Link>
            </Button>}
        />
    );
}

export default PrivateRoute;