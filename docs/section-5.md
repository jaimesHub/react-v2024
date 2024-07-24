# Section 5: Tư duy thiết kế UI với Component

- [Importing and Exporting in React](https://react.dev/learn/importing-and-exporting-components)
- [Export default in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Fragement](https://react.dev/reference/react/Fragment)
- [JSX with {}](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
    - `Nguyên tắc : sử dụng cặp dấu ngoặc nhọn { } để viết code javascript bên trong html`
- react devtool extension
- Props
- Truyền function từ cha sang con 
- [DOM Events](https://react.dev/learn/responding-to-events) 
    - onClick
    - onChange
- [useState hook](https://react.dev/learn/state-a-components-memory)
- Re-render với State

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

- `Default Exports`
    - luôn `export` 1 function duy nhất được ghi sau nó
    - import/export duy nhất 1 component đó
    - khi import, đặt tên gì cũng được. Ví dụ: import ABC, export default MyComponent => MyComponent == ABC
- `Named Exports`
    - import/export nhiều function components
    - khi import cần trùng tên với nơi nó export

- Việc đặt tên file là `.jsx` (ám chỉ code React với JS) 
    - còn JSX là tên công nghệ giúp dịch code React (HTML + JS)
    - giải thích Công nghệ đằng sau React ==> JSX --`transform`--> (HTML + JS)
    - JSX: 1 parent --> sử dụng `Fragment` để render 1 component có `nhiều` hơn 1 thẻ div và k sử dụng thừa HTML
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

- Kiểm soát Data với State - `useState` hook
    - Bài toán: Sau khi click vào `Add` button, ta có thể lấy được input được nhập vào
    - Code chạy từ trên xuống dưới
    - Khai báo tất cả trong component function
    - `useState`
    - destructuring array
    - ngoài props, nếu ta cập nhật biến `state` thì web sẽ tự động cập nhật giao diện
    - `state` là 1 biến số của JS
    - `Nguyên tắc quan trọng`: trong JSX, `không thể` in ra được array/object
    - Summary:
        - kiểm soát data thông qua `state`
            - giống như `trạng thái / tâm trạng` con người
        - ôn lại `props`
            - giống như `tài sản` được truyền từ đời cha sang đời con
- Re-render w state
    - Note: `sửa đổi trực tiếp state của React có thể sẽ gây ra bugs`
    - Mỗi lần biến `state` thay đổi, ngay lập tức phần giao diện & data sẽ được vẽ lại giao diện (re-render)
- Render list
    - Sử dụng `map` để lặp dữ liệu
- `Warning`: Each child in a list should have a unique `key` prop
    - `Mặc định`, nếu bạn không dùng key, React sẽ `tự động` sinh key (sử dụng index của array)
    - Không nên dùng key là chỉ số của mảng (index), hoặc chuỗi string gắn liền với index
    - SD Key phù hợp :
        - Sử dụng id lấy từ backend
        - Generate id `trước khi vào vòng lặp`
    - Summary
        - Nguyên nhân tại sao phải cần dùng `key` ?
        - Làm sao để sử dụng hiệu quả ?
- Render với điều kiện
    - Sử dụng JSX
    - sau && thì nên chỉ có 1 khối div block thôi