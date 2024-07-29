import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/api.service";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";

const UserPage = () => {
    // lift-up state
    const [dataUsers, setDataUsers] = useState([]);

    // empty dependencies array is empty -> run once 
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    };

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />
        </div>
    );
}

export default UserPage;