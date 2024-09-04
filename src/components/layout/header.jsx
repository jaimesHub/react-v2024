import { Link } from 'react-router-dom';
import {
    UsergroupAddOutlined,
    HomeOutlined,
    AuditOutlined,
    LoginOutlined,
    AliwangwangOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext); // user data changes -> this will re-render

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'products',
            icon: <AuditOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Logout',
                    key: 'logout',
                },
            ],
        }] : []),
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Header;