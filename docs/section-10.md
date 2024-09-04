# Auth module

- Stateless, Stateful
    - Mô hình truy cập: kiểm soát từ a -> z (fe, be trong 1 source, stateful)
    - Stateless: tách riêng fe & be
    - Xác thực user 
        - access_token
        - refresh_token
        - jwt 
- Nơi lưu trữ Token ở đâu (FE)
    - Lưu tại localStorage --> lưu data forever
    - Session --> xoá khi đóng tab 
    - Cookie --> tự động hết hạn , chặn/cho phép js truy cập giá trị , bảo mật hơn 
- Logic xử lý sau khi login 
    - Lưu trữ thông tin user 
    - F5 --> data mất --> gọi api để lấy lại data 