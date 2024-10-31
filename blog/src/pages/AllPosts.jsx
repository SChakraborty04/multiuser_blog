import React, { useEffect } from 'react'
import service from '../appwrite/config'
import { PostCard,Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([])
    useEffect(()=>{},[])
    service.getPost([]).then((posts)=>{
        if(posts)
        setPosts(posts.documents)
    })
    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 h-50'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
