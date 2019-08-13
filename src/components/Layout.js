import React from 'react'
import {Helmet} from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'
import {Box, Heading} from '@primer/components'
import '@primer/css/layout/index.scss'

// FIXME: this works around known issues with Heading's default prop {m: 0}
Object.assign(Heading.defaultProps, {
  m: null,
  mt: 0,
  mb: 0
})

export default function Layout(props) {
  const {children, title, pageContext = {}, ...rest} = props

  const {
    site: {siteMetadata}
  } = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let pageTitle = title
  if (pageContext.frontmatter && !pageTitle) {
    pageTitle = pageContext.frontmatter.title
  }

  return (
    <>
      <Helmet>
        <title>
          {pageTitle ? `${pageTitle} • ` : ''}
          {siteMetadata.title}
        </title>
        <meta name="keywords" content="Framer Next" />
        <meta property="og:article:author" content="Natalie Marleny" />
        <meta property="og:title" content="Framer Next" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://framernext.tech" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:description" content="A technical showcase of the Framer API implemented with Next.js" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/10384315/53922681-2f6d3100-402a-11e9-9719-5d1811c8110a.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@nataliemarleny" />
      </Helmet>
      <Box bg="black" color="blue.2" {...rest}>
        {children}
      </Box>
    </>
  )
}