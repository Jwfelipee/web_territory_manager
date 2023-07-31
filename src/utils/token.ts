const DOT = '_dot_'
const SLASH = '_slash_'
const QUESTION_MARK = '_question_mark_'
const HYPHEN = '_hyphen_'

export const tokenToSend = (token: string) => {
   const tokenEncoded = token.replace(/\./g, DOT).replace(/\//g, SLASH).replace(/\?/g, QUESTION_MARK).replace(/-/g, HYPHEN)
   return tokenEncoded
}

export const tokenToReceive = (token: string) => {
   const tokenDecoded = token.replace(DOT, '.').replace(SLASH, '/').replace(QUESTION_MARK, '?').replace(HYPHEN, '-')
   return tokenDecoded
}
