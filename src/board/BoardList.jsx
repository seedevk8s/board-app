import axios from "axios";
import { useEffect, useState } from "react";

export default function BoardList() {
    // 게시판 목록 데이터를 저장할 상태 변수 선언
    const [datas, setDatas] = useState([]);

    // 컴포넌트가 마운트된 후 게시판 목록을 가져오는 옴
    useEffect(() => {
        axios.get("http://localhost:8080/api/board")
            .then((response) => {
                setDatas(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching board list:", error);
            });
    }, []);

    return (
        <>
            <div className="container">
                <h2>게시판 목록</h2>
                <table className="board_list">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            datas.length > 0 && datas.map(board => (
                                <tr>
                                    <td>{board.boardIdx}</td>
                                    <td className="title">{board.title}</td>    
                                    <td>{board.hitCnt}</td>
                                    <td>{board.createdDt}</td>
                                </tr>
                            ))

                        }

                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">조회된 결과가 없습니다.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <a href="/board/boardWrite.do" className="btn">글쓰기</a>
            </div>
        </>
    );
};
