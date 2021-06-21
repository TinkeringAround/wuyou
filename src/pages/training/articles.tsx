import React, {FC, Fragment, useState} from 'react'
import Slider, {Settings} from 'react-slick'

// Hooks
import {useBreakpoint} from "../../hooks/useBreakpoint";

// Styles
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'

// Custom Components
import Section from '../../components/section'
import Pagination from '../../components/pagination'

// ===============================================
interface Props {
    articles: Array<any>
}

// ===============================================
const Articles: FC<Props> = ({articles}) => {
    const {isMobile} = useBreakpoint();

    const [slider, setSlider] = useState<Slider | null>(null)
    const [currentSlide, setCurrentSlide] = useState<number>(0)

    const settings: Settings = {
        adaptiveHeight: false,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        afterChange: (currentSlide: number) => setCurrentSlide(currentSlide)
    }

    return (
        <Fragment>
            <Slider ref={sliderRef => setSlider(sliderRef)} {...settings}>
                {articles != null &&
                articles.map((article, articleIndex) => (
                    <div key={'Trainer-Article-' + articleIndex}>
                        <Section
                            textLeft={isMobile ? true : articleIndex % 2 === 0}
                            title={article.title}
                            subtitle={article.subtitle}
                            paragraph={article.paragraph}
                            url={article.url}
                        />
                    </div>
                ))}
            </Slider>
            <Pagination
                goto={(index: number) => {
                    if (slider) slider.slickGoTo(index)
                }}
                count={articles?.length}
                currentSlide={currentSlide}
            />
        </Fragment>
    )
}

export default Articles
