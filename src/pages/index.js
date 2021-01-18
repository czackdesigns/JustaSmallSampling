import React from "react"
import Layout from "../components/layout"
import styles from './index.module.scss'
import WordCount from '../components/wordCount'

const content = <p>The input in the below component will take in a subreddit and a length of time.<br/>
The component then makes a call to an express server that uses a library called Puppeteer to crawl the subreddit passed to it.<br/>
The server then uses a library called Cheerio to parse the HTML, then push an object containing each comment from that page to an array.<br/>
The server then checks if the time the last comment in the array was posted is longer ago than the length of time passed to the server.<br/>
If it was not longer, then the array of comment objects is pushed to a new array in the scope of the parent function.<br/>
The url from the 'next page' button is then passed to a function that tells Pupeteer to navigate the instance of Chromium to that url.<br/>
The process then repeats until the parameters for navigating to the next page are not met.<br/>
When this happens the server sends a response with the array of comment objects that each page's comments were pushed to before navigating to the next page.<br/>
When the component receives the array, it iterates through the array and gets a count of each word.<br/>
While doing this it ignores the excluded words(if checked) and sorts from most to least.<br/>
It then sets that array to the state. <br/>
On the state update a function runs that iterates over the new state and creates an ordered list item for each.</p>

const DropDown = ({ content }) => {
  const onToggle = () => {
  const content = document.querySelector(`div > h3`)

  content.style.display === 'none' ? content.style.display = 'block' : content.style.display = 'none'

  }
  return (
    <div className={styles.description_container}>
      <h2 onClick={onToggle}>What it does:</h2>
      <h3 style={{'display':'none'}}>
        {content}
      </h3>
    </div>
  )
}

export default () => (
  <Layout>
    <div id={styles.title}>
      <h1>Welcome to Just a Small Sampling of Some of My Work</h1>
    </div>
    <DropDown content={content} />
    <WordCount />
  </Layout>
)

