import React, { FC } from 'react'

// Custom Components:
import Section from '../../components/section'
import { ResponsiveContext } from 'grommet'

// ===============================================
interface Props {
  articles: Array<any>
}

// ===============================================
const Articles: FC<Props> = ({ articles }) => {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <>
            {articles != null &&
              articles.map((article, articleIndex) => (
                <Section
                  key={'Trainer-Article-' + articleIndex}
                  textLeft={isMobile ? true : articleIndex % 2 === 0}
                  title={article.title}
                  subtitle={article.subtitle}
                  paragraph={article.paragraph}
                />
              ))}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Articles
