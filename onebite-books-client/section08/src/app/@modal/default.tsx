// 만약 / (index 페이지)로 접속한다면?
// @modal에는 / 이 페이지가 없기 때문에 404가 뜰 것임
// 그래서 default.tsx를 만들어줘야 함
// 그냥 index로 접속할 때는 아무것도 띄우지 않도록 null
export default function Default() {
    return null;
}
