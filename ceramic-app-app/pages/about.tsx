import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../components/post.component";
import { useCeramicContext } from "../context";


const AboutUs: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const clients = useCeramicContext() 
  const {ceramic, composeClient} = clients

  const [postDetails, setPostDetails ] = useState({})

  const getPost = async () => {
    const postDetails = await composeClient.executeQuery(`
      query {
        node(id:"$${id}"){
          ...on Posts{
            body
            id
            created
            author {
              basicProfile {
                username
                name
                id
              }
            }
            comments(last:30){
              edges {
                node {
                  id
                  author {
                    basicProfile {
                      username
                      name
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)
    console.log(postDetails.data)

    setPostDetails({
      author: {
        id: postDetails.data?.node.author.basicProfile.id,
        body: postDetails.data?.node.author.basicProfile.body,
        created: postDetails.data?.node.author.basicProfile.created
      },
      post: {
        id: postDetails.data?.node.id,
        body: postDetails.data?.node.body,
        created: postDetails.data?.node.created
      }
    })
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className = "content">
      <>
      <div className="aboutusStuff">
        <h2>About us</h2>
        <p>
          At the intersection of innovation and empowerment, we've crafted a digital identity solution rooted in user autonomy. Leveraging Next.js for seamless experiences, we unite Ceramic's decentralized data, ComposeDB, and GraphQL. Our integration with Metamask fortifies security, delivering a trust-driven, transparent ecosystem. With privacy as our cornerstone, we redefine digital identity management for the Web3 era
        </p>
      </div>
      </>
    </div>
  )
}

export default AboutUs