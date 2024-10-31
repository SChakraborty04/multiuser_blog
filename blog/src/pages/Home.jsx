import React from 'react'
import { Container,PostCard } from '../components'
import service from '../appwrite/config'

function Home() {
    const [posts, setPosts] = React.useState([])
    React.useEffect(()=>{
        service.getPosts().then((posts)=>{
            if(posts)
            setPosts(posts.documents)
        })
    },[])
    if(posts.length===0){
        return <div className='py-8 w-full'>
            <Container>
                <h1 className='text-2xl font-bold'>No posts available.</h1>
            </Container>
        </div>
    }
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

export default Home
