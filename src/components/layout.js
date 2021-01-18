import React from 'react'
import { Link } from 'gatsby'
import styles from './layout.module.scss'

export default ({ children }) => (
    <div>
        <div id={styles.menu}>
            <Link to='/'>Home</Link>
            <Link to='/'>About Me</Link>
            <Link to='/'>Contact</Link>
        </div>
        {children}
    </div>
    
)