# Backend repo to English-Dictionary

### lambda function url :
 - https://eu-south-1.console.aws.amazon.com/lambda/home?region=eu-south-1#/functions/english-dictionary-lambda?newFunction=true&tab=code


 ## endpoints
 ### get specific word
 - http://localhost:3010/:word

 ### get specific word and specific pos
 - http://localhost:3010/:word/:pos

  ### get random word with chosen pos and (optional) a letter that a word starts with
 - http://localhost:3010/part-of-speech/:pos?letter=:letter

