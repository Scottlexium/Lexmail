## The Request body
### send a POST request to https://lexmail-api.azurewebsites.net/send
### with a JSON body
```json

{
    "Emails":["user1@gmail.com", "user2@gmail.com"],
    "from":"What ever you want to be displayed as the sender",
    "subject":"the subject of the email you want to send",
    "name":"your name",
    "logoLink":"https://link-to-logo-when-clicked",
    "EventDescription":"simple long text about the event",
    "snippet":"short description of the event",
    "title":"title of the event", 
    "logoIMG":"https://link-of-image-hosted", 
    "calendar":"add to calender link",
    "download":"download link for an app needed to attend", 
    "join":"join link for the event", 
    "date":"date of the event ie 22/07/2022", 
    "time":"time of the event ie 9:30am GMT", 
    "location":"location of the event ie microsoft teams", 
    "requirement":"whats needed for ", 
    "requirementText":"This is simple a text saying what they need",
    "btnColor":"#0089e1"
}
```
# Environment variables
## USER: user@gmail.com
## PASSWORD: 12345678
## SERVICE: Gmail
### You can create calender here: "https://www.labnol.org/calendar/"