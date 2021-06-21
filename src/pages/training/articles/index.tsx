import React, {FC, Fragment} from 'react'

// Hooks
import {useBreakpoint} from "../../../hooks/useBreakpoint";

// Styles
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Partials
import ArticlesDesktop from "./desktop";
import ArticlesMobile from "./mobile";

// ===============================================
interface Props {
    articles: Array<any>
}

// ===============================================
const Articles: FC<Props> = ({articles}) => {
    const {isMobile} = useBreakpoint();

    return (
        <Fragment>
            {!isMobile && <ArticlesDesktop articles={articles}/>}
            {isMobile && <ArticlesMobile articles={articles}/>}
        </Fragment>
    )
}

export default Articles
