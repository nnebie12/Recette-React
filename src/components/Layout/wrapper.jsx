function wrapper (props){
    return <div className='container mx-auto max-w-screen-xl my-6 px-4 xl:px-0'>
            {props.children}
           </div>
    ;
}

export default wrapper;