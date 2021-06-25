
#Monitor
This folder contains a script that designed to check website urls every 2 minutes after execution and send a report (URL & timestamp) if there were 3 consecutive failed check on a single URL  

#Clone the project repo
clone the project repository from github into local pc 
HTTPS => https://github.com/prodgy15/URL-Monitoring.git
SSH => git@github.com:prodgy15/URL-Monitoring.git

#Dependencies
Please make sure you have all the following dependencies installed on your computer' project file before you test the script
1. node.js => node.org
2. npm => https://www.npmjs.com
3. request => https://www.npmjs.com/package/request
4. lodash =>  https://www.npmjs.com/package/lodash
5. moment =>  https://www.npmjs.com/package/moment

#Monitor.js
Monitor.js is our main file which hosts a simple script that responds to nodejs when the file is initiated

#Websites/URLs
websites array on Monitor.js contains the websites urls and IDs which should be tested for every 2 minutes after Monitor.js execution
NB: The websites IDs should be unique to avoid repetition

#setInterval
A node.js method to check time interval that contains callback function to be called when the timer elapses, and the number of milliseconds to wait before calling the callback function

#How to start a script
1. Open the cloned project' folder on your preferable text editor/ IDE
2. Open terminal on your text editor/ IDE
3. Start the script by typing "node Monitor.js" and hit enter
4. Script already started wait for the report to be logged on the terminal

NB: The websites urls will be monitored for every 2 minutes after script execution, the report will be displayed in exactly 6 minutes after three consecutive check "FAILS" on a single url