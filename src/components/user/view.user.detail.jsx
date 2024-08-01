import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

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
                    <div>
                        <img
                            height={150}
                            width={150}
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
                        <input type="file" hidden id="btnUpload" />
                    </div>
                    {/* <Button type="primary">Upload Avatar</Button> */}
                </> :
                <>
                    <p>No data</p>
                </>
            }
        </Drawer>
    );
}

export default ViewUserDetail;