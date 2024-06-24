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

- Component
    - Concept: a block code
    - React components are regular JS functions
    - Component = HTML + CSS + JS
    - Component for re-using
    - name convention: `tên component bắt buộc viết hoa chữ cái đầu tiên`
    - Write component
        - C1: `<MyComponent></MyComponent>`
        - C2: `<MyComponent />`
    - Question: Nếu có nhiều component hay logic viết quá nhiều thì làm thế nào ? -> chia tách, import/export components
- Export default ...
    - luôn `export` 1 function duy nhất được ghi sau nó
    - import/export duy nhất 1 component đó
    - khi import, đặt tên gì cũng được. Ví dụ: import ABC, export default MyComponent => MyComponent == ABC
- Export
    - import/export nhiều function components
    - khi import cần trùng tên với nơi nó export
- Việc đặt tên file là `.jsx` (ám chỉ code React với JS) còn JSX là tên công nghệ giúp dịch code React (HTML + JS)
    - giải thích Công nghệ đằng sau React ==> JSX --transform--> HTML + JS
    - JSX: 1 parent --> sử dụng Fragment để render 1 component có nhiều hơn 1 thẻ div và k sử dụng thừa HTML
    - style css: 
        - css như bình thường ở HTML/CSS
        - style inline in React
- Cặp dấu ngoặc đầu tiên trong `div` cho phép chúng ta viết JS trong html
- Nested Component
    - react devtool extension
        - component: phân tích cha con components
        - profiler: đo hiệu năng
    - behind the scene: `main.jsx` -> `App.jsx`
- Components
    - Cách tư duy: vẽ base component (cứ code theo cách bạn hiểu).
    - Code tất cả mọi thứ trong 1 component, nếu chia được layout thì càng tốt (chia tách parent-child)
- Props
    - Làm sao để sử dụng `Props`
        - Xác định đâu là `cha` component, `con` component
        - Định nghĩa `data` (sẽ truyền vào props ở `con`) ở `cha` component 
        - Truyền data từ `cha` -> `con`: sử dụng `object`
        - Ở `con` component, đặt `đúng` tên `props` cho tham số truyền vào (parameters)
    - Từ ban đầu, ở `con` component đã có `props` kể cả `cha` component có truyền đối số hay k
    - Mặc định sẽ là `{}`
    - Một vài cách code để `lấy data`
        - `props` thay đổi thì giao diện sẽ thay đổi theo, tuy nhiên giao diện không hề `reload` lại
        - c1: `object destructuring`
        - c2: `props.value`
        - c3: lấy trực tiếp từ tham số đầu vào của `arrow function component` -> k dành cho `Beginner`
- Truyền `function` từ cha sang con
    - addNewTodo={addNewTodo}
        - addNewTodo / addNewTodoFunc: tên của props
        - addNewTodo: `giá trị`, truyền kiểu tham trị
    - Sử dụng `props` ở `con` component để gọi hàm
    - Truyền data vào function cần làm như thế nào ?
- (DOM) Event phổ biến
    - `click`
    - `change`
    - `event` param cũng được cung cấp từ ban đầu như `props`
    - để lấy được `event.target.value` khi click `Add` button, ta cần sử dụng `bộ nhớ` của react -> `state`
    - làm sao để truyền tham số đầu vào cho `handleOnChange` function ? -> sử dụng `arrow function`
    - Do sd hàm onChange, nên ở đầu hàm, nó sẽ tự động cho chúng ta biến `event` (đây là event của HTML)