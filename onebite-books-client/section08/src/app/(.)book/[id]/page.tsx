// 인터셉팅 라우트
// 특정 조건일 때 기존 페이지 대신 다른 페이지를 보여주는 것
// 특정 조건은 내가 설정하는 것이 아님,,
// 특정 조건: 초기 접속이 아닐 때! (Link, push 등을 통한 CSR 렌더링으로 이동했을 때)
// 예시: 인스타그램에서 피드 중 한 개를 누르면(CSR 렌더링으로 이동) 팝업으로 떠서 이전으로 돌아갈 수 있게끔 뜨지만
// 그 상태에서 새로고침을 하면(초기 접속) 전체 페이지로 뜸

//(.)book\[id]: 현재 경로(.)의 book\[id] 폴더를 대체하겠다
// 만약 test라는 폴더 안에 만들려면 (..)book\[id]라고 작성해야 함
// test/temp라는 폴더 안에 만들려면 (..)(..)book\[id] ((..)마다 한 단계씩 올라감)
// (...)book\[id]: app 폴더 바로 아래 있는 폴더를 대체하겠다
// index 페이지에서 이동하면 이거 뜨고, 새로고침 하면 원래 페이지 뜸
// Modal로 감싸줘서 모달 형태로 띄우자

import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: any) {
    return (
        <div>
            가로채기 성공!
            <Modal>
                <BookPage {...props} />
            </Modal>
        </div>
    );
}
