import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";


export default function gallery() {

  const { allData, loading } = useFetchData('/api/photos');

  return <>
    <Head>
      <title>RaDins: Gallery Photos</title>
    </Head>

    <div className="gallerypage">
      <div className="container">
        <div className="gallerytopsec">
          <div className="topphonesec">
            <div className="lefttitlesec">
              <h4>RaDins GALLERY PHOTOS</h4>
              <h1>Abuzar <br /> Photographes</h1>
              <Link href="/gallery#galleryimages">
                <button>
                  VIEW MORE
                </button>
              </Link>
            </div>
            <div className="rightimgsec">
              <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/3/1.jpg" alt="img_1" />
              <div className="r_img_top">
                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/6.jpg" alt="img_2" />
                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/5.jpg" alt="img_3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gallerybtmphotos" id="galleryimages">
        <div className="container">
          <div className="gbtmtitles text-center">
            <h3>01 // <span>OUR PORTFOLIO</span></h3>
            <h2>RaDin Capture <span>All of your</span> <br /> beautiful memories</h2>
          </div>
          <div className="gallery_image_grid">
            {loading ? <Spinner /> : <>
              {allData.map((photo) => {
                return <div className="image-item">
                  <img src={photo.images[0]} alt={photo.title} />
                  <div className="galleryimgiteminfo">
                    <h2>{photo.title}</h2>
                    <p>By RaDin</p>
                  </div>
                </div>
              })}
            </>}
          </div>
        </div>
      </div>
    </div>
  </>
}