import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from "react";

export default function projectslug() {

  const router = useRouter();

  const { slug } = router.query;

  const { allData, loading } = useFetchData(`/api/projects?slug=${slug}`);

  const createdAtDate = allData && allData[0]?.createdAt ? new Date(allData && allData[0]?.createdAt) : null;

  // function to format the date as '20 may 2024 14:11 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ''; // or handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true, // use 12-hour format
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    }

    if (inline) {
      return <code>{children}</code>
    } else if (match) {
      return (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag='pre'
            {...props}
            codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
          <button onClick={handleCopy} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px', borderRadius: '5px' }}>
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      )
    }
  }

  return <>
    <Head>
      <title>{slug}</title>
    </Head>

    <div className="projectslug">
      <div className="projectslugimg">
        <div className="container">
          <div className="proslugimg">
            <img src={allData && allData[0]?.images[0]} alt={allData && allData[0]?.title} />
          </div>

          <div className="projectsluginfo">
            <div className="leftmainproinfo">
              <h1>{allData && allData[0]?.projectCategory}</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptatum reprehenderit ducimus sequi ipsum maiores magni minima. Laboriosam, officia officiis. Sequi voluptatem sit saepe quaerat!</p>
              <a target="_blank" href={allData && allData[0]?.livePreview}>Live Preview</a>
            </div>
            <div className="rightmainproinfo">
              <div>
                <h3>Category</h3>
                <h2>{allData && allData[0]?.projectCategory}</h2>
              </div>
              <div>
                <h3>Client</h3>
                <h2>{allData && allData[0]?.client}</h2>
              </div>
              <div>
                <h3>Start Date</h3>
                <h2>{formatDate(createdAtDate)}</h2>
              </div>
              <div>
                <h3>Designer</h3>
                <h2>RaDin</h2>
              </div>
            </div>

          </div>

          <div className="projectslugsliderimg">
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={30}
              freeMode={true}
              grabCursor={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              {allData && allData[0]?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt="project" />

                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="projectslugdescription">
        <div className="container">
          <div className="psdescri">
            <h2>Project Description</h2>
            <div className="blogcontent">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: Code,
                }}  
              >
                {allData[0]?.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}