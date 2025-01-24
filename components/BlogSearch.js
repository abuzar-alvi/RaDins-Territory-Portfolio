import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";



const extractFirstParagraph = (markdown) => {
    // Split markdown by double newline to separate paragraphs
    const paragraphs = markdown.split('\n\n');
    
    // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
    return paragraphs[0];
};

export default function BlogSearch(props) {

    const { allData = [], loading } = useFetchData('/api/blogs');  // Assuming useFetchData returns an object with allData and loading

    const [searchResult, setSearchResult] = useState([]);
    const [blogtitle, setBlogtitle] = useState('');  // blogtitle should be initialized as a string

    // filter for published blogs required
    const publishedData = allData.filter(ab => ab.status === 'publish');

    // Function to handle search
    useEffect(() => {
        if (!blogtitle.trim()) {  // Here, blogtitle should be checked if it's an empty string
            setSearchResult([]);
            return;
        }

        const filteredblogs = publishedData.filter(blog =>
            blog.title.toLowerCase().includes(blogtitle.toLowerCase())
        );

        setSearchResult(filteredblogs);  // setSearchResult should be used to update searchResult state

    }, [blogtitle, allData]);  // Include allData in dependencies to ensure useEffect updates when data changes

    const handleBlogClick = () => {
        setBlogtitle('');  // This clears the input field when a blog is clicked
    };

    if (loading) {
        return <p>Loading...</p>; // Optionally handle the loading state
    }

    return <>
        <div className="searchblogfix">
            <div className="searchblogsectionfix">
                <div className="sbsfinput flex gap-1">
                    <input type="text"
                        placeholder='Search blog here'
                        value={blogtitle}
                        onChange={(e) => setBlogtitle(e.target.value)}
                    />
                    <div className='sbsinputclose' onClick={props.cls}>
                        <IoClose />                        
                    </div>
                </div>
                <div className="sbsfsearchlist mt-2">
                    {blogtitle && (<>
                        {searchResult.length === 0 ? <h3>No Blog Found <span>(please chq your spelling)</span></h3> : <>
                            {searchResult.slice(0, 10).map((blog) => {
                                return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="sbsfsbox" onClick={props.cls}>
                                    <h2>{blog.title}</h2>
                                    <p>{extractFirstParagraph(blog.description)}</p>    
                                </Link>
                            })}

                        </>}
                    </>)}

                </div>
            </div>

        </div>
    </>
}