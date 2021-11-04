import About from "../components/containers/homepage/about"
import Landing from "../components/containers/homepage/landing"
import NgosWithUs from "../components/containers/homepage/ngos-with-us"
import Stats from "../components/containers/homepage/stats"
import { GetStaticProps } from 'next'
import { getHomepageOrgs, getHomepageStats } from '../utils/homepage'

// Props for homepage containers
export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from backend with util function
  const statsDataPromise = getHomepageStats()
  const orgsDataPromise= getHomepageOrgs()

  // Get data by resolving promises
  const [statsData, orgsData] = await Promise.all([statsDataPromise, orgsDataPromise])

  return {
    props: {
      statsData,
      orgsData
    },
    revalidate: 10
  }
}

export default function Home({ statsData, orgsData }) {
  return (
    <>
      <Landing />
      <Stats statsData={statsData} />
      <About />
      <NgosWithUs orgsData={orgsData}/>
    </>
  )
}
