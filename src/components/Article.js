import React from "react";

const Article=(props)=>{


    return (<a target="_blank" href={props.articledata.url} className="article"><div>
        <div className="image" alt="NO IMAGE FOUND">
        <img src={props.articledata.urlToImage}/>
        </div>
        <h3>{props.articledata.title}</h3>
        <p>{props.articledata.description}</p>
        <br/>
        </div>
        {props.articledata.source.name?"source: "+props.articledata.source.name:""}
        </a>)
}

export default Article;