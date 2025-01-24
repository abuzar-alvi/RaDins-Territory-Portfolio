import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

  const { allData, loading } = useFetchData('/api/projects');

  const publishedData = allData.filter(ab => ab.status === 'publish');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // filter projects based on category
    if (selectedCategory === 'All') {
      setFilteredProjects(allData.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(allData.filter(pro => pro.status === 'publish' && pro.projectCategory[0] === selectedCategory));
    }
  }, [selectedCategory, allData])

  return <>
    <Head>
      <title>Project</title>
    </Head>
    <div className="projectpage">
      <div className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>My Recent WorksMy Recent Works</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Websites</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'Digital' ? 'active' : ''} onClick={() => setSelectedCategory('Digital')}>Digital</button>
            <button className={selectedCategory === 'Content' ? 'active' : ''} onClick={() => setSelectedCategory('Content')}>Content</button>
          </div>
          <div className="projects_cards">
            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProjects.length === 0 ? (
                <h1 className="w-100 flex flex-center mt-3">No Project Found</h1>
              ) : (
                filteredProjects.map((pro) => (
                  <Link href={`/projects/${pro.slug}`} className="procard" key={pro._id}>
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <p>Project Description</p>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}



          </div>
        </div>
      </div>
    </div>
  </>
}