import React, { useState, useEffect,useRef,useCallback } from "react";
import "./test.css"
const list = require("./data.json")

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
        threshold: 0.1
      }
      
      const observer = new IntersectionObserver(callback, options);
      observer.observe(observerRef.current)  
    }
  }, [observerRef.current])
  
  const callback = useCallback((entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio) {
        // 엘리먼트가 뷰포트에 진입함
        console.log('oveserved');
        observer.unobserve(observerRef.current); // 기존에 걸려있는거 observer 해제
        setData(data.concat(list));
      }
    });
  }, [data])
  
  console.log(observerRef)
  console.log(data)
 
    return (
         <ul>
            {data.map((item:any,index:any) => {
              if(index === data.length -1){
                return (
                  <li key={`${index}`} ref={observerRef}>
                    <div>{item.id}</div>
                    <h2>{item.gender}</h2>
                    <h3>{item.email}</h3>
                  </li>
                )
              } else {
                return (
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