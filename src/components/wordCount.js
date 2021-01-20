import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './wordCount.module.scss'
import excludedWords, {words} from '../constants/excludedWords'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const BoringWords = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div id={styles.modal}>
            <span onClick={onOpenModal}>Boring Words</span>
            <Modal open={open} onClose={onCloseModal} center>
                <div id={styles.modal_content}>
                    {words.map(word => <span key={uuidv4()}>{word},</span>)}
                </div>
            </Modal>
        </div>
    )
}

export default class RedditWordCount extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            comments: [],
            subreddit: '',
            isLoading: false,
            wordCount: [],
            minutes: '5',
            checked: false,
            err: false,
        }
    }
    setWordCount = (comments) => {
        let words = []
        comments.forEach((comment) => {
            words.push(comment.commentText.toLowerCase().split(' '))
        })

        let wordCount = []
        words.forEach((arrOfWords) => {
            arrOfWords.forEach((word) => {
                wordCount.push(word.trim().toLowerCase())
            })
        })

        let matches = []
        wordCount.forEach((word) => {
            !matches.includes(word) && matches.push(word)
        })

        if (this.state.checked) {
            matches = matches.filter((match) => {
                return !excludedWords.includes(match)
            })
        }
        
        let matchCount = []
        matches.forEach((match) => {
            matchCount.push({
                word: match,
                wordCount: 0
            })
        })

        matchCount.forEach((word) => {
            wordCount.forEach((match) => {
                word.word === match && word.wordCount++
            })
        })
        
        matchCount.sort((a, b) => {
            return b.wordCount - a.wordCount
        })

        matchCount.splice(100)

        this.setState({ wordCount: matchCount })     
    }
    onChange = (e) => {
        const subreddit = e.target.value.trim()
        this.setState({ subreddit })
    }
    onClick = (e) => {
        this.setState({ minutes: e.target.value })
    }
    onCheck = (e) => {
        this.setState({ checked: !this.state.checked })
    }
    onReset = (e) => {
        e.preventDefault()
        this.setState({ isLoading: false, err: false, wordCount: [] })
    }
    onSubmit = (e) => {
        e.preventDefault()

        this.setState({ isLoading: true })
        fetch(`https://reddit-scraper-crawler.herokuapp.com/search?searchquery=${this.state.subreddit}-${this.state.minutes}`, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ comments: data, isLoading: false, err: false })
                this.setWordCount(this.state.comments)
            })
            .catch(err => this.setState({ err: true, isLoading: false }))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    SubReddit: r/:<input onChange={this.onChange}></input>
                    <select onChange={this.onClick}>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                        <option value={20}>20 minutes</option>
                    </select>
                    Exclude <BoringWords />?<input onChange={this.onCheck} type='checkbox' />
                    <button>Go!</button>
                    <button onClick={this.onReset}>Reset</button>
                </form>
                {
                    this.state.isLoading && <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div>
                }
                {
                    this.state.err && <div>Oops your request could not be completed...<br/>Please make sure you spelled the subreddit correctly and try again!</div>
                }
                {
                    this.state.wordCount && 
                    <ol id={styles.wordList}>
                        {
                            this.state.wordCount.map((word) => {
                                return <li key={uuidv4()}>{word.word} - {word.wordCount}, </li>
                            })
                        }
                    </ol>
                }
            </div>
        )
    }
}