import { Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }

        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
        // console.log(">>> check file: ", file);
    }

    console.log(">>> check preview: ", preview);

    return (
        <Drawer
            width={"40vw"}
            title="Detail User"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar: </p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px",
                        width: "100px",
                        border: "1px solid #ccc"
                    }}>
                        <img
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain"
                            }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                        />
                    </div>
                    <div>
                        <label
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                            htmlFor="btnUpload">
                            Upload Avatar
                        </label>
                        <input
                            type="file"
                            hidden
                            id="btnUpload"
                            // onChange={handleOnChangeFile} 
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    <div style={{
                        marginTop: "10px",
                        height: "100px",
                        width: "100px",
                        border: "1px solid #ccc"
                    }}>
                        <img
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain"
                            }}
                            src={preview}
                        />
                    </div>
                </> :
                <>
                    <p>No data</p>
                </>
            }
        </Drawer>
    );
}

export default ViewUserDetail;