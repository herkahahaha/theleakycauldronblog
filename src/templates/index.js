import React, { Component } from 'react'

import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import ArticleList from '../components/ArticleList'
import config from '../../data/config'

const PaginationLink = props => {
  if (!props.test) {
    return (
      <Link to={props.url} className='button is-rounded'>
        {props.text}
      </Link>
    )
  } else {
    return (
      <span disabled className='button is-rounded'>
        {props.text}
      </span>
    )
  }
}

export default class IndexPage extends Component {
  render () {
    const { pageContext } = this.props
    const { group, index, first, last } = pageContext
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString()

    const websiteSchemaOrgJSONLD = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    }

    return (
      <div>
        <Helmet>
          <title>Home | The Leaky Cauldron Blog</title>
          {/* Schema.org tags */}
          <script type='application/ld+json'>
            {JSON.stringify(websiteSchemaOrgJSONLD)}
          </script>
          <link rel='canonical' href='https://theleakycauldronblog.com/' />
        </Helmet>
        <div className='columns is-centered'>
          <div className='column'>
            <ArticleList posts={group} />
            <section className='section'>
              <div className='buttons is-centered'>
                <PaginationLink test={first} url={previousUrl} text='Previous Page' />
                <PaginationLink test={last} url={nextUrl} text='Next Page' />
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}
