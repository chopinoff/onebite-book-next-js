'use client';

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    // dialog라는 HTML 태그는 모달의 역할을 하기 때문에 기본 상태가 꺼진 상태임
    // 처음부터 켜진 상태로 바꿔줘야 함
    // + 상단 고정되도록 top 0 설정
    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0,
            });
        }
    }, []);

    // 첫번째: 모달에 렌더링할 컴포넌트, 두번째: 모달이 렌더링 될 위치인 DOM 요소
    // 왜 이렇게까지 함?: 모달은 화면 전체를 뒤덮는데 페이지의 특정 부분에 속해있으면 뭔가 어색함
    // 따라서 createProtal을 이용해서 페이지 특정 요소에 고정적으로 렌더링하도록 설정한 것임
    return createPortal(
        <dialog
            onClose={() => {
                // esc 눌렀을 때도 뒤로 가기
                router.back();
            }}
            onClick={(e) => {
                // 모달 배경 클릭되면 뒤로 가기
                // e.target이 아직 nodeName을 지원하지 않으므로 any 타입으로 전환
                if ((e.target as any).nodeName === 'DIALOG') {
                    router.back();
                }
            }}
            className={style.modal}
            ref={dialogRef}
        >
            {children}
        </dialog>,
        // 최상위 layout에 해당 엘리먼트 만듦
        document.getElementById('modal-root') as HTMLElement
    );
}
