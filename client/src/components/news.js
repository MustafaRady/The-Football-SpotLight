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
            setNews(response.data.articles);
            console.log(response.data.articles) /// respose.data.articles///
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getNews();
    },[]);

    return(
        <div className="container m-auto grid grid-cols-1 gap-y-2 w-4/5">
            {news.length > 0 && news.map((element,index)=>{
                return <a href={element.url}><div key={index} className="bg-white h-24 hflex flex-col justify-center items-center rounded-lg hover:bg-blue-200">
                           <h1 className="md:text-2xl text-lg font-bold">{element.title}</h1>
                </div>
                </a>
            })}

        </div>
    )
}