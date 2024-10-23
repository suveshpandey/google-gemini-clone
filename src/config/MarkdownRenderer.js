import React from 'react'
import {marked} from 'marked'

const MarkdownRenderer = ({markeddownText}) => {
    const createMarkup = () =>{
        return {__html: marked(markeddownText)}; //convert markdown to HTML
    }
    return(
        <div className='prose prose-lg mac'>

        </div>
    )
};


export default MarkdownRenderer
