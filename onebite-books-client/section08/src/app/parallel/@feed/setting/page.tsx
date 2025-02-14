export default function Page() {
    // parallel의 @feed 슬롯 안에서만 렌더링 됨
    // parallel/setting으로 이동할 경우에 이 페이지가 feed props의 자리를 채움
    return <div>@feed/setting</div>;
}
