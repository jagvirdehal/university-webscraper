// Modules to run html server
const express = require('express');
const app = new express();
const path = require('path');
//const ejs = require('ejs');
const bodyParser = require('body-parser');

// Modules for webscraping
const rp = require('request-promise');
const cheerio = require('cheerio');

// Because of how 'request-promise' works, we had to make a workaround with
// events. The code doesn't stop and wait for the scraping to finish before
// moving on, so we created an event that is called when scraping is finished
// and code resumes from there
var EventEmitter = require("events").EventEmitter;
var output = new EventEmitter();
output.data = {};

// Dictionary to store all the programs after scraping
var programs = {};
// Variable to count how many universities scraped. Used in afterScrape()
var scrapeCount = 0
// University scraping links
var universities = [
  ['Ottawa', [
    'http://www.electronicinfo.ca/programs/university/ottawa?group=a-b',
    'http://www.electronicinfo.ca/programs/university/ottawa?group=c',
    'http://www.electronicinfo.ca/programs/university/ottawa?group=d-g',
    'http://www.electronicinfo.ca/programs/university/ottawa?group=h-m',
    'http://www.electronicinfo.ca/programs/university/ottawa?group=n-z'
  ]],
  ['Waterloo', [
    'http://www.electronicinfo.ca/programs/university/waterloo?group=a-c',
    'http://www.electronicinfo.ca/programs/university/waterloo?group=d-h',
    'http://www.electronicinfo.ca/programs/university/waterloo?group=i-n',
    'http://www.electronicinfo.ca/programs/university/waterloo?group=o-z'
  ]],
  ['York', [
    'http://www.electronicinfo.ca/programs/university/york?group=a-c',
    'http://www.electronicinfo.ca/programs/university/york?group=d-h',
    'http://www.electronicinfo.ca/programs/university/york?group=i-z'
  ]]
];
// Variable for the number of universities. Used in afterScrape()
var numberOfUniversities = universities.length;


// Scholarship scraping links
var scholarshipLinks = [
  'http://www.electronicinfo.ca/scholarships/?search=&group=a-g',
  'http://www.electronicinfo.ca/scholarships/?search=&group=h-l',
  'http://www.electronicinfo.ca/scholarships/?search=&group=m-o',
  'http://www.electronicinfo.ca/scholarships/?search=&group=p-t',
  'http://www.electronicinfo.ca/scholarships/?search=&group=u-w',
  'http://www.electronicinfo.ca/scholarships/?search=&group=x-z'
];

var EventEmitter = require("events").EventEmitter;
var ssOutput = new EventEmitter();
ssOutput.data = {};

ssUniversityList = {};

// Scraping function. Each university has multiple urls to scrape from.
// 'uni' is the name of the university. Used to add dictionary entries.
// 'urls' is an array with all the urls for the university.
function scrape(uni, urls) {
  var count = 0
  for (var i = 0; i < urls.length; i++) {
    // This just tells the scarper what url to use, and sets what data to collect
    var options = {
      uri: urls[i],
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    // options var is passed through the scraping module
    rp(options)
      .then(($) => {
        // Every h2 with class 'result-heading' is pushed into output variable
        $('.result-program').each(function(i, elem) {
          var enroll = $(this).children('.result-attributes').text()
            .replace(/\t/g, '').replace(/\n/g, '').split('Enrollment:');
          enroll = enroll[enroll.length - 1].replace(/Open/gi, '');

          var language = $(this).children('.result-attributes').text()
            .replace(/\t/g, '').replace(/\n/g, '').split(' |')[0];

          var program = $(this).children('.result-heading').text();

          output.data[program] = {
            enroll: enroll,
            language: language
          };
        });
        // Called everytime a url is finished scraping
        output.emit('update');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  output.on('update', function() {
    // Counts how many times a url is done
    count++
    if (count == urls.length) {
      // Add all the programs to the dictionary entry and run afterScrape()
      programs[uni] = output.data;
      output.data = {};
      afterScrape();
    }
  })
}

// This function is called after each university's programs have been scraped
function afterScrape() {
  scrapeCount++
  if (scrapeCount == numberOfUniversities) {
    scrapeScholar(scholarshipLinks);
  } else {
    scrape(universities[scrapeCount][0], universities[scrapeCount][1])
  }
}

function scrapeScholar(urls) {
  var count = 0
  for (var i = 0; i < urls.length; i++) {
    // This just tells the scarper what url to use, and sets what data to collect
    var options = {
      uri: urls[i],
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    // options var is passed through the scraping module
    rp(options)
      .then(($) => {
        $('.result-scholarship').each(function(i, elem) {
          var scholarship = $(this).children('.result-heading').text();
          var ssUni = $(this).children('.result-subheading').text().replace(/\t/g, '').replace(/\n/g, '');
          var ssMoney = $(this).children('.result-attributes').text().replace(/\t/g, '').replace(/\n/g, '');
          var ssRenewable = (ssMoney.split('(Renew')[ssMoney.split('(Renew').length - 1] == "able)")
          var ssDeadlineCheck = ($(this).children('.result-actions').children('.actions-heading').text() == "Deadline");
          var ssDeadline = $(this).children('.result-actions').children('.actions-text').text().replace(/\t/g, '').replace(/\n/g, '');
          ssUniversityList[ssUni] = "";

          ssOutput.data[scholarship] = {
            university: ssUni,
            money: ssMoney,
            renewable: ssRenewable,
            deadlineCheck: ssDeadlineCheck,
            deadline: ssDeadline
          };
        });
        // Called everytime a url is finished scraping
        ssOutput.emit('update');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ssOutput.on('update', function() {
    // Counts how many times a url is done
    count++
    if (count == urls.length) {
      display();
    }
  })
}

function display() {
  // List of universities
  unis = Object.keys(programs);

  // Express module setup
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.set('view engine', 'ejs')

  // Express programs get request
  app.get('/', function(req, res) {
    res.render('programs.ejs', {
      universities: Object.keys(programs),
      programs: []
    });
    // res.sendFile('./public/programsPage.html',{root:'./'});
  });

  // Express programs post
  app.post('/', function(req, res) {
    uniArg = req.body.university;
    enrollArg = req.body.enrollment.split('-');
    langArg = req.body.language;

    // console.log(uniArg);
    // console.log(enrollArg);
    // console.log(langArg);

    filteredPrograms = {};

    if (uniArg == "Any") {
      filteredPrograms = JSON.parse(JSON.stringify(programs));
      // for (var i = 0; i < unis.length; i++) {
      //   filteredPrograms.push(programs[unis[i]]);
      // }
    } else {
      filteredPrograms[uniArg] = programs[uniArg];
      // filteredPrograms.push(programs[uniArg]);
    }

    unis = Object.keys(filteredPrograms);

    if (enrollArg != "Any") {
      for (var i = 0; i < unis.length; i++) {
        programList = Object.keys(filteredPrograms[unis[i]]);
        for (var j = 0; j < programList.length; j++) {
          programEnrollment = filteredPrograms[unis[i]][programList[j]].enroll;
          // If enrollment unspecified, remove from list
          if (programEnrollment == "") {
            delete filteredPrograms[unis[i]][programList[j]];
            // If enrollment not within range, remove from list
            // Seperate if statement to avoid parseInt error on empty string
          } else if (!(parseInt(programEnrollment) >= parseInt(enrollArg[0]) &&
              parseInt(programEnrollment) < parseInt(enrollArg[1]))) {
            delete filteredPrograms[unis[i]][programList[j]];
          }
        }
      }
    }

    if (langArg != "Any") {
      for (var i = 0; i < unis.length; i++) {
        programList = Object.keys(filteredPrograms[unis[i]]);
        for (var j = 0; j < programList.length; j++) {
          programLanguage = filteredPrograms[unis[i]][programList[j]].language;
          if (programLanguage != langArg) {
            delete filteredPrograms[unis[i]][programList[j]];
          }
        }
      }
    }

    // console.log(filteredPrograms);

    res.render('programs', {
      universities: Object.keys(programs),
      programs: filteredPrograms
    });
  });

  // Express scholarships get request
  app.get('/scholarships', function(req, res) {
    res.render('scholarships.ejs', {
      universities: Object.keys(ssUniversityList).sort(),
      scholarships: {}
    });
  });

  app.post('/scholarships', function(req, res) {
    uniArg = req.body.university;
    renewArg = req.body.renewable;
    deadlineArg = req.body.deadline;

    filteredScholarships = JSON.parse(JSON.stringify(ssOutput.data));

    scholarshipNames = Object.keys(filteredScholarships);
    for (var i = 0; i < scholarshipNames.length; i++) {
      compare = filteredScholarships[scholarshipNames[i]]
      if (uniArg != "Any" && uniArg != compare.university) {
        delete filteredScholarships[scholarshipNames[i]];
      } else if (renewArg != "Any" && renewArg != compare.renewable) {
        delete filteredScholarships[scholarshipNames[i]];
      } else if (deadlineArg != "Any" && deadlineArg != compare.deadlineCheck) {
        delete filteredScholarships[scholarshipNames[i]];
      }
    }

    res.render('scholarships.ejs', {
      universities: Object.keys(ssUniversityList).sort(),
      scholarships: filteredScholarships
    })
  });

  // Express listen on port 8080
  app.listen(8080)
}

// Universities and urls to be scraped
scrape(universities[scrapeCount][0], universities[scrapeCount][1])
