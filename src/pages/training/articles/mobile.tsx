import React, {FC} from 'react';
import Section from "../../../components/section";

// ===============================================
interface Props {
    articles: Array<any>
}

// ===============================================
const ArticlesMobile: FC<Props> = ({articles}) => {
    return (
        <div>
            {articles != null &&
            articles.map((article, articleIndex) => (
                <div key={'Trainer-Article-' + articleIndex}>
                    <Section
                        textLeft
                        title={article.title}
                        subtitle={article.subtitle}
                        paragraph={article.paragraph}
                        url={article.url}
                    />
                </div>
            ))}
        </div>
    );
};

export default ArticlesMobile;
