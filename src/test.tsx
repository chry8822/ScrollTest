import React, { useState, useEffect,useRef,useCallback } from "react";
import "./test.css"
const list = require("./data.json")
// 더미 제이슨 데이터

const Test = () => {
  const [data, setData] = useState(list);
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo (0,0)
    if (observerRef.current) {
      console.log('observer 등록')
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
      
      const observer = new IntersectionObserver(callback, options);
      observer.observe(observerRef.current)  
    }
  }, [observerRef.current])
 // 렌더링된 마지막 아이템이 current 에 담기면 observer 생성하고 해당 current 감시

  
  // 옵저브 걸어놓은 엘리먼트가 발견되면 콜백 실행
  const callback = useCallback((entries: any, observer: any) => { 
    console.log("observer",observer)
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio) {
        // 엘리먼트가 뷰포트에 진입함(감시되는 엘리먼트가 option에 설정한 위치에 도달하면)
        console.log('oveserved');
        observer.unobserve(observerRef.current); // 기존에 걸려있는거 observer 해제
        setData(data.concat(list)); // 기존 데이터에 list 를 붙임
      }
    });
  }, [data])
  
 
    return (
         <ul>
            {data.map((item:any,index:any) => {
              if(index === data.length -1){
                // li 에 마지막에 ref를 걸기 위한 조건문
                // 마지막 요소가 root 설정 값에 충족되면 옵저빙 해제, 데이터 추가 그리고 추가된 데이터에 
                // 마지막 요소에 다시 ref 가 걸리고 감시 시작 반복 무한 스크롤
                return (
                  <li key={`${index}`} ref={observerRef}>
                    <div>{item.id}</div>
                    <h2>{item.gender}</h2>
                    <h3>{item.email}</h3>
                  </li>
                )
              } else {
                return (
                  // 조건이 맞지 않으면 ref가 없는 일반 엘리먼트 렌더
                  <li key={`${index}`}>
                    <div>{item.id}</div>
                    <h2>{item.gender}</h2>
                    <h3>{item.email}</h3>
                  </li>
                )
              }
            })}
         </ul>
    )
}

export default Test;