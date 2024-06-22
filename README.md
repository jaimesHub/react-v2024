# React Ultimate Starter Template
Template này được sử dụng cho series React Ultimate (Vite) của tác giả Hỏi Dân IT (Eric)

### Môi trường chạy dự án: Node.js v20.14.0
https://nodejs.org/download/release/v20.14.0/

## Về tác giả
Mọi thông tin về Tác giả Hỏi Dân IT, các bạn có thể tìm kiếm tại đây:

Website chính thức: https://hoidanit.vn/

Youtube “Hỏi Dân IT” : https://www.youtube.com/@hoidanit

Tiktok “Hỏi Dân IT” :  https://www.tiktok.com/@hoidanit

Fanpage “Hỏi Dân IT” : https://www.facebook.com/askITwithERIC/

Udemy Hỏi Dân IT: https://www.udemy.com/user/eric-7039/

===

Các bước cài đặt: (chế độ development)
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.development (nếu cần thiết)
4. Chạy dự án: npm run dev

===

Cách chạy tại chế độ production:
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.production (nếu cần thiết)
4. Build dự án: npm run build
5. Chạy dự án: npm run preview

===

Notes
- assets/ và public/
    - assets
        - tài nguyên được load với hiệu năng tốt hơn
        - chỉ những người có quyền truy cập vào source mới vào được
    - public
        - tài nguyên được public ra sau khi build dự án xong
        - người dùng nào (public ra ngoài internet) cũng có thể xem và truy cập được

- JS/JSX/TS/TSX trong React
    - React --> compiler --> JS code
    - Sử dụng `Babel`
        - Compiler code này tự hiểu .js và .jsx (`main.js` hay `main.jsx` đều như nhau)
        - Tự động hiểu .js và .jsx là code của React
        - `Nên` sử dụng `.jsx` (javascript + JSX) hay `.tsx` (typescript + tsx)
        - [Ví dụ](https://codesandbox.io/p/sandbox/create-react-app-iuync?)
            - `react-scripts`
    - Using `vite`
        - có cơ chế dịch code riêng của nó nên nó sẽ k hiểu .js
        - Chỉ hiểu được .jsx (`main.jsx`), nếu thấy .js (`main.js`) sẽ bị lỗi
        - Tương tự với .tsx
    - [Nếu bạn không sử dụng framework, việc tổ chức cấu trúc (structure) như nào, phụ thuộc vào quan điểm và trình độ của mỗi người](https://dev.to/itswillt/folder-structures-in-react-projects-3dp8)

- Cơ chế hoạt động của React với browser: SPA
    - Tất cả sau khi build đều compile về html/css/js
    - Cơ chế SSR: Server-side rendering
    - Cơ chế CSR: Client-side rendering