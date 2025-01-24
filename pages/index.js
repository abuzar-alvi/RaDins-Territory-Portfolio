import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaCalendarDays, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";

export default function Home() {

  // active service background color
  const [clickedIndex, setClickedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(clickedIndex);

  const handleHover = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = (i) => {
    setActiveIndex(clickedIndex); // set the first item as active when mouce leaves
  }


  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [allWork, setAllWork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs'),
        ])

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAllData(projectData);
        setAllWork(blogsData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    // filter projects based on category
    if (selectedCategory === 'All') {
      setFilteredProjects(allData.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(allData.filter(pro => pro.status === 'publish' && pro.projectCategory[0] === selectedCategory));
    }
  }, [selectedCategory, allData])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  function isEven(n) {
    return (n % 2 == 0);
  }

  function projectMotion(n) {
    if (n === 0) {
      return 'fade-right';
    } else if (n === 1) {
      return 'fade-up';
    } else {
      return 'fade-left';
    }
  }

  return (
    <>
      <Head>
        <title>RaDins - Personal Portfolio</title>
        <meta name="description" content="RaDins - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" textAnchor="middle" className="animate-stroke">Hi</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos='fade-right'>
                I am RaDin
              </span>
              <h1 className="hero_title" data-aos='fade-right'>Web Developer + <br /><span className="typed-text">Ux Designer</span></h1>
              <div className="hero_img_box heroimgbox" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='1200'>
                <img src="/img/me.jpg" alt="coder" />
              </div>
              <div className="lead" data-aos='fade-up'>
                I break down complex user experience problems to create integritiy focussed solutions that connect thousands of people
              </div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link href='/' download={'/img/1.jpg'} className='download_cv'>Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li><a href="/"><FaTwitter /></a></li>
                  <li><a href="/"><LiaBasketballBallSolid /></a></li>
                  <li><a href="/"><GrLinkedinOption /></a></li>
                  <li><a href="/"><FaGithub /></a></li>
                </ul>
              </div>
            </div>

            {/* rightside image section */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='1200'>
                <img src="/img/solar-system-animation.svg" alt="coder" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>7+</h3>
              <h4>Years of <br /> Experience</h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>20+</h3>
              <h4>Projects <br /> Completed</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>12</h3>
              <h4>Open Source <br /> Library</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>25+</h3>
              <h4>Happy <br /> Customers</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2 data-aos='fade-up'>My Quality Services</h2>
            <p data-aos='fade-up'>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="services_menu" data-aos='fade-up'>
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
                onClick={() => setClickedIndex(index)}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2 data-aos="fade-up">My Recent Works</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="project_buttons" data-aos="fade" data-aos-duration='2000'>
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
                filteredProjects.slice(0, 4).map((pro, index) => (
                  <Link href={`/projects/${pro.slug}`} className="procard" data-aos={isEven(index) == true ? 'fade-right' : 'fade-left'} key={pro._id}>
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
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Mobile Developer</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2018 - 2022</span>
                <h3>BICKDRIMS LLC.</h3>
                <p>Front-end developer (internship)</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2021 - 2023</span>
                <h3>VAGALLY LLC.</h3>
                <p>Full-Stack Developer</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2021 - 2024</span>
                <h3>LEAD DEVELOPER</h3>
                <p>Blockdots, United State</p>
              </div>
            </div>
          </div>

          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2018 - 2020</span>
                <h3>BSC COMPUTER SCIENCE</h3>
                <p>IMIT</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2021 - 2022</span>
                <h3>London Institute Of Management</h3>
                <p>Degree in computing and information system (ABMA Level 500)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">My Skills</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="myskills_cards">
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="mongodb" />
                <h3>82%</h3>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="redux" />
                <h3>85%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="react" />
                <h3>90%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="js" />
                <h3>87%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Recent Blogs</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="recent_blogs">
            {allWork.slice(0, 3).map((blog, index) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog" data-aos={projectMotion(index)} data-aos-duration={index === 1 ? '1200' : '900'}>
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogCategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
