import React from "react"
import Layout from "../components/layout"
import styles from './index.module.scss'
import WordCount from '../components/wordCount'
import Countdown from '../components/countdown'


const content = {
  one: 
    <p>
      This component takes in two arguments: (subbreddit, length of time)<br/>
      It will then return the 100 most used words in (subreddit), in the last (length of time).<br/>
      If the scraping takes longer than 30 seconds the server will send a timeout request.<br/>
      This is because it is hosted free on Heroku and I am completely unwilling to pay for an upgrade.<br/>
      If this happens, loading will disapear, and you will be prompted with an error. 
    </p>,
  two: 
    <p>
      The input in the below component will take in a subreddit and a length of time.<br/>
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
      On the state update a function runs that iterates over the new state and creates an ordered list item for each.
    </p>
}

const DropDown = ({ description, name, title }) => {
  const onToggle = () => {
  const content = document.querySelector(`#${name} > h3`)
  content.style.display === 'none' ? content.style.display = 'block' : content.style.display = 'none'

  }
  return (
    <div id={name}>
      <h2 onClick={onToggle}>{title}:</h2>
      <h3 style={{'display':'none'}}>
        {description}
      </h3>
    </div>
  )
}

export default () => {


  return (
    <Layout>
      <div id={styles.title}>
        <h1>Welcome to Just a Small Sampling of Some of My Work</h1>
      </div>
      <DropDown title={'What it does'} name={'whatItDoes'} description={content.one} />
      <DropDown title={'How it works'} name={'howItWorks'} description={content.two} />
      <WordCount />
      <Countdown time={'20'} />
    </Layout>
  )
}
