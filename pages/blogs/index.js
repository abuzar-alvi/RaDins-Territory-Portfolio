import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import BlogSearch from '@/components/BlogSearch';

export default function blogs() {

  // pagination
  const [currentPage, setCurrentPage] = useState(1) // for page 1
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState('');

  // fetch blog data
  const { allData, loading } = useFetchData('/api/blogs');

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  }

  const handleSearchClose = () => {
    setSearchInput(false);
  }

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // total number of blogs
  const allBlog = allData.length;

  // filter all data based on search query
  const filteredBlogs = searchQuery.trim() === '' ? allData : allData.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // calculate index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get the current page's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedData = currentBlogs.filter(ab => ab.status === 'publish');

  const sliderPubData = allData.filter(ab => ab.status === "publish");

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBlog / perPage); i++) {
    pageNumbers.push(i);
  }



  return <>
    <Head>
      <title>Blogs</title>
    </Head>
    <div className="blogpage">
      <section className="tophero">
        <div className="container">
          <div className="toptitle">
            <div className="toptitlecont flex">
              <h1>Welcome to <span>RaDins Blogs!</span></h1>
              <p>I write about web, mobile development and modern JavaScript frameworks. The best articles, links and news related to web and mobile development.</p>
              <div className="subemail">
                <form className="flex">
                  {/* <input onClick={handleSearchOpen} placeholder='Search blogs here...' type="text" /> */}
                  <p onClick={handleSearchOpen}>Search blogs here...</p>
                  <button>Search</button>
                </form>
              </div>
            </div>
          </div>
          <div className="featured">
            <div className="container">
              <div className="border">

              </div>
              <div className="featuredposts">
                <div className="fetitle flex">
                  <h3>Featured Posts :</h3>
                </div>
                <div className="feposts flex">
                  <Swiper
                    slidesPerView={'auto'}
                    freeMode={true}
                    spaceBetween={30}
                    className='mySwiper'
                    modules={[FreeMode]}
                  >
                    {
                      loading ? <Spinner /> : <>
                        {sliderPubData.slice(0, 4).map((blog) => {
                          return <SwiperSlide key={blog._id}>
                            <div className="fpost" key={blog._id}>
                              <Link href={`/blogs/${blog.slug}`}>
                                <img src={blog.images[0]} alt={blog.title} />
                              </Link>
                              <div className="fpostinfo">
                                <div className="tags flex">
                                  {blog.blogCategory.map((cat) => {
                                    return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                  })}
                                </div>
                                <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                <div className="fpostby flex">
                                  <img src="/img/coder.jpg" alt="" />
                                  <p>By RaDin</p>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        })}
                      </>
                    }
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='populartagssec'>
        <div className="container">
          <div className="border"></div>
          <div className="populartagsdata">
            <div className="fetitle">
              <h3>Popular Tags :</h3>
            </div>
            <div className="poputags">
              <Link href='/blog/category/Node Js' className='ptag'>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Yxc2M3MWp5ZDRmdnFlaGFtbmkxMzE1cWxkN2h6cm16MmhuczloNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kdFc8fubgS31b8DsVu/giphy.webp" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    Node Js
                  </div>
                </div>
              </Link>
              <Link href='/blog/category/VS Code' className='ptag'>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9reHFyZ2NsdXR1a3pkbmF2cHdiY2RzNGYxdjF6NnFsZGFhNTJwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IdyAQJVN2kVPNUrojM/giphy.webp" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    VS Code
                  </div>
                </div>
              </Link>
              <Link href='/blog/category/React Js' className='ptag'>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FeNAsjO55tPbgaor7ma%2Fsource.gif&f=1&nofb=1&ipt=1b6c2d1f4493f3ac96918899cd5c25eeec185ba33f30d800552d9b6a6655a8c7&ipo=images" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    React Js
                  </div>
                </div>
              </Link>
              <br />
              <Link href='/blog/category/Python' className='ptag'>
                <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW9zYjVrMHdnNTZybndsZXZ3Y3h1ZDRibzcydDA1bXV0Z3Rrd2w1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LMt9638dO8dftAjtco/giphy.webp" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    Python
                  </div>
                </div>
              </Link>
              <Link href='/blog/category/Vue Js' className='ptag'>
                <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3lwazc0M2Z2aXM3eGttOThlZTJkZG9iNG0yNDZ5cGdzNjBwcnN1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VgGthkhUvGgOit7Y9i/giphy.webp" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    Vue Js
                  </div>
                </div>
              </Link>
              <Link href='/blog/category/Java Script' className='ptag'>
                <img src="https://media0.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif?cid=6c09b9529mzgtfwe3idt9j5w4vyco2hmp3e1bs41ehtke9xa&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" />
                <div className="tags">
                  <div className="apps">
                    <span></span>
                    Java Script
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="latestpostsec">
        <div className="container">
          <div className="border"></div>
          <div className="latestpostsdata">
            <div className="fetitle">
              <h2>Latest Articles :</h2>
            </div>
            <div className="latestposts">
              {loading ? <Spinner /> : <>
                {publishedData.map((blog) => {
                  return <div className="lpost" key={blog._id}>
                    <div className="lpostimg">
                      <Link href={`/blogs/${blog.slug}`}>
                        <img src={blog.images[0]} alt={blog.title} />
                      </Link>
                      <div className="tags">
                        {blog.blogCategory.map((cat) => {
                          return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                        })}
                      </div>
                    </div>
                    <div className="lpostinfo">
                      <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea sapiente velit doloribus id nesciunt quos in. Officiis id vero vitae, neque beatae aliquid similique.</p>
                      <h4 className='flex'>
                        <img src="/img/coder.jpg" alt="" />
                        <span>By RaDin</span>
                      </h4>
                    </div>
                  </div>
                })}
              </>}
            </div>
          </div>
          {/* For pagination */}
          {publishedData.length === 0 ? ("") : (
            <div className="blogspaginationbtn flex flex-center mt-3">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
            </div>
          )}
        </div>
        {searchInput ? <BlogSearch cls={handleSearchClose} /> : null}
      </section>
    </div>
  </>
}