export const words = ['this', 'the', 'a', 'is', 'i', 'of', 'to', 'in', 'and', 'that', 'for', 'are', 'it', 'was', 'has', 'with', 'if', 'or', 'but', 'what', 'so', 'by', 'as', 'an']
const excluded = []

words.map((word) => {
    excluded.push(word + '?', word + '.', word + '!', word) 
})

export default excluded


