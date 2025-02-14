import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: any) {
    // 해결해야 할 문제: 가로채기는 성공했지만 모달 뒷배경이 index 페이지가 아니라 가로채기 성공!임.. 당연함
    // 해결 방법: Modal 페이지를 다른 페이지에 삽입해서 병렬로 뜨도록 함 > 패러렐 라우트 사용
    // @modal/로 이동시키기
    // 이동시키면? 최상위 layout에 modal로 전달됨
    // 여기서 이동한 /book은 layout의 modal 영역 안에서만 이동됨
    return (
        <Modal>
            <BookPage {...props} />
        </Modal>
    );
}
