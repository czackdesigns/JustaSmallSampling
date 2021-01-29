import React from "react"
import Layout from "../components/layout"
import styles from './index.module.scss'
import WordCount from '../components/wordCount'
import Countdown from '../components/countdown'


const content = {
  one: 
    <ul>
      <li>This component takes in two arguments: (subbreddit, length of time)</li>
      <li>It will then return the 100 most used words in (subreddit), in the last (length of time).</li>
      <li>If the scraping takes longer than 30 seconds the server will send a timeout request.</li>
      <li>This is because it is hosted free on Heroku and I am completely unwilling to pay for an upgrade.</li>
      <li>If this happens, loading will disapear, and you will be prompted with an error.</li> 
    </ul>,
  two: 
    <ul>
      <li>The input in the below component will take in a subreddit and a length of time.</li>
      <li>The component then makes a call to an express server that uses a library called Puppeteer to crawl the subreddit passed to it.</li>
      <li>The server then uses a library called Cheerio to parse the HTML, then push an object containing each comment from that page to an array.</li>
      <li>The server then checks if the time the last comment in the array was posted is longer ago than the length of time passed to the server.</li>
      <li>If it was not longer, then the array of comment objects is pushed to a new array in the scope of the parent function.</li>
      <li>The url from the 'next page' button is then passed to a function that tells Pupeteer to navigate the instance of Chromium to that url.</li>
      <li>The process then repeats until the parameters for navigating to the next page are not met.</li>
      <li>When this happens the server sends a response with the array of comment objects that each page's comments were pushed to before navigating to the next page.</li>
      <li>When the component receives the array, it iterates through the array and gets a count of each word.</li>
      <li>While doing this it ignores the excluded words(if checked) and sorts from most to least.</li>
      <li>It then sets that array to the state.</li>
      <li>On the state update a function runs that iterates over the new state and creates an ordered list item for each.</li>
    </ul>,
  three: 
    <ul>
      <li>This component takes the input from the Date Picker element and displays a live countdown in days, hours, minutes, and seconds until that date and time.</li>
    </ul>,
  four: 
    <ul>
      <li>This component uses the Moment.js library and the react-datepicker node package.</li>
      <li>The countdown component takes the input from the datepicker and calls the .diff() function provided by Moment.js</li>
      <li>This function finds the difference in time between two dates.</li>
      <li>The differences are divided out into their respective days, hours, minutes, or seconds.</li>
      <li>The component pushes a new time difference to the state and subsequently updates, once per second.</li>
    </ul>
}

const DropDown = ({ description, name, title }) => {
  const onToggle = () => {
    const content = document.querySelector(`#${name} > h3`)
    if (content.style.visibility === 'hidden') {
      content.style.opacity = '100%'
      content.style.visibility = 'visible'
      content.style.position = 'relative' 
    } else {
      content.style.visibility = 'hidden'
      content.style.position = 'absolute'
      content.style.opacity = '0%'

      
    }
    
  }
  return (
    <div onClick={onToggle} className={styles.description_container} id={name}>
      <h2>{title}:</h2>
      <h3 style={{'visibility':'hidden', 'position':'absolute', 'transition':'opacity ease 2.5s', 'opacity':'0'}}>
        {description}
      </h3>
    </div>
  )
}

export default () => {


  return (
    <Layout>
      <div id={styles.title}>
        <h1>Welcome and Enjoy (Just) a Small Sampling of Some of My Work</h1>
      </div>
      <div className={styles.component_container}>
        <div className={styles.flex_container}>
          <DropDown title={'What it does'} name={'whatItDoes'} description={content.one} />
          <DropDown title={'How it works'} name={'howItWorks'} description={content.two} />
        </div>
        <WordCount />
      </div>
      <div className={styles.component_container}>
      <div className={styles.flex_container}>
        <DropDown title={'What it does'} name={'whatItDoesCount'} description={content.three} />
        <DropDown title={'How it works'} name={'howItWorksCount'} description={content.four} />
      </div>
      <Countdown />
      </div>
    </Layout>
  )
}
