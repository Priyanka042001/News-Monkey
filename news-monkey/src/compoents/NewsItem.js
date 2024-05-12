import React from 'react'

const NewsItem = (props) => {
    

        let {title, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div className='conatiner my-3'>
                <div className="card" >
                    <img className="card-img-top" src={!imageUrl ? "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6jBnX4tVuzY/v0/1200x800.jpg":imageUrl} alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}.....</h5>
                            <p className="card-text">{description}....</p>
                            <p className='card-text'><small className="text-muted"> By {!author?"unknown":author} on {new Date(date).toGMTString()} </small></p>
                            <a rel="noreferrer" href={newsUrl} target='_blank' className = "btn btn-sm btn-dark">Read more</a>
                        </div>
 
                </div>
            </div>
        )
    
}

export default NewsItem
