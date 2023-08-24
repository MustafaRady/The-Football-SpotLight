import axios from "axios";
import React, { useEffect, useState } from "react";

export default function News(){
    const [news,setNews] =useState([]);
    async function  getNews(){
        try{
            const response = await axios.get("https://newsapi.org/v2/top-headlines?category=sports&language=ar",{
                headers:{
                    "X-Api-Key":"b11bf6b87ba1448b801b135ee1384680"
                }
            })
            const array =[];
            for ( let i = 0 ; i< 7 ; i++){
                array.push(response.data.articles[i]);
            }
            setNews(array);
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getNews();
    },[]);

    return(
        <div className=" grid grid-cols-1 gap-y-2 w-full p-3">
            <div className="mx-auto text-2xl text-white pt-2 text-Color text-center " >
                    Latest News
                </div>
            {news.length > 0 && news.map((element,index)=>{
                return <a href={element.url}><div key={index} className="bg-white h-24 flex-col justify-center items-center  hover:bg-blue-200">
                           <h1 className="md:text-xl text-lg font-bold">{element.title}</h1>
                </div>
                </a>
            })}

        </div>
    )
}