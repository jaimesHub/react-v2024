import { Drawer, Input } from 'antd';
import { useEffect, useState } from 'react';

const DetailUser = (props) => {
    const {
        isDrawerDetailOpen,
        setIsDrawerDetailOpen,
        dataDetail,
        setDataDetail
    } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    useEffect(() => {
        if (dataDetail) {
            setFullName(dataDetail.fullName);
            setEmail(dataDetail.email);
            setPhone(dataDetail.phone);
        }
    }, [dataDetail]);


    return (
        <>
            <Drawer title="Detail user"
                onClose={() => {
                    setDataDetail(null);
                    setIsDrawerDetailOpen(false);
                }}
                open={isDrawerDetailOpen}
            >
                <div style={{ marginBottom: "8px" }}>
                    <span style={{ marginBottom: "8px" }}>FullName</span>
                    <Input
                        value={fullName}
                        disabled
                    />
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <span style={{ marginBottom: "8px" }}>Email</span>
                    <Input
                        value={email}
                        disabled
                    />
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <span style={{ marginBottom: "8px" }}>Phone number</span>
                    <Input
                        value={phone}
                        disabled
                    />
                </div>
            </Drawer>
        </>
    );
}

export default DetailUser;