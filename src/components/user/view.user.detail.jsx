import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser,
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

    const handleUpdateAvatar = async () => {
        // step 1: upload file
        console.log(">>> check file update avatar:: ", selectedFile);
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        console.log(">>> check resUpload: ", resUpload);

        if (resUpload.data) {
            // success
            const newAvatar = resUpload.data.fileUploaded;
            console.log(">>> check newAvatar:: ", newAvatar);

            // step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUpdateAvatar.data) {
                // clear data
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);

                // loading users
                await loadUser();

                // update success
                notification.success({
                    message: "Update Successfully",
                    description: "Update avatar successfully!"
                })
            } else {
                // update fail
                notification.error({
                    message: "Update Error!",
                    description: "Update avatar fail!"
                })
            }
        } else {
            // fail
            notification.error({
                message: "Error while uploading avatar",
                description: JSON.stringify(resUpload.message)
            });

            return;
        }
    }

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
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "100px",
                                marginBottom: "15px"
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
                            <Button
                                onClick={() => handleUpdateAvatar()}
                                type="primary">Save</Button>
                        </>}
                </> :
                <>
                    <p>No data</p>
                </>
            }
        </Drawer>
    );
}

export default ViewUserDetail;