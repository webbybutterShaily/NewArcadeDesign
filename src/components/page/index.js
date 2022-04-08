import React from 'react';

const Page = (props) => {
    return(
        <>
            <section className="hero-page-title-section">
                <h1 className="page-title">{props.title || "Page Title"}</h1>
            </section>
            <div className="content-wrapper">
                {props.children}
            </div>
        </>
    );
}

export default Page;